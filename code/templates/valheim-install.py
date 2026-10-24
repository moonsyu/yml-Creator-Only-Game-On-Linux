#!/usr/bin/env python3
"""Install the generator's Valheim mod bundle before the game server starts."""
import argparse
import hashlib
import io
import json
import os
from pathlib import Path, PurePosixPath
import re
import stat
import sys
import tempfile
import time
import urllib.request
import zipfile

API = "https://thunderstore.io/api/experimental/package/"
PACKAGE = re.compile(r"^([A-Za-z0-9_]+)-([A-Za-z0-9_]+)(?:-(\d+\.\d+\.\d+))?$")
LOADER = "denikson-BepInExPack_Valheim"
MAX_DOWNLOAD = 64 * 1024 * 1024
MAX_EXPANDED = 256 * 1024 * 1024
MANIFEST = ".yml-generator-mods.json"


def safe_path(value):
    if not isinstance(value, str) or not value or "\\" in value or ":" in value or "\x00" in value:
        raise ValueError("Invalid file path: " + repr(value))
    parts = value.split("/")
    if any(p in ("", ".", "..") for p in parts) or PurePosixPath(value).is_absolute():
        raise ValueError("Unsafe file path: " + value)
    return value


def target_path(root, relative):
    relative = safe_path(relative)
    current = root
    if current.is_symlink():
        raise ValueError("Refusing symlink: " + str(current))
    for part in relative.split("/"):
        current = current / part
        if current.is_symlink():
            raise ValueError("Refusing symlink: " + str(current))
    return current


def fetch(url):
    if not url.startswith("https://"):
        raise ValueError("Only HTTPS downloads are supported")
    request = urllib.request.Request(url, headers={"User-Agent": "Valheim-YML-Generator/1.0", "Accept": "application/json, */*"})
    last_error = None
    for attempt in range(3):
        try:
            with urllib.request.urlopen(request, timeout=60) as response:
                data = response.read(MAX_DOWNLOAD + 1)
            if len(data) > MAX_DOWNLOAD:
                raise ValueError("Download exceeds 64 MiB")
            return data
        except (OSError, TimeoutError) as error:
            last_error = error
            if attempt < 2:
                time.sleep(attempt + 1)
    raise RuntimeError("Download failed: " + url) from last_error


def archive_entries(data):
    entries = {}
    with zipfile.ZipFile(io.BytesIO(data)) as archive:
        if len(archive.infolist()) > 10000 or sum(i.file_size for i in archive.infolist()) > MAX_EXPANDED:
            raise ValueError("Mod archive is too large")
        for info in archive.infolist():
            # Thunderstore packages built on Windows can use backslashes even
            # though ZIP paths normally use '/'. Normalize before validating so
            # legitimate packages work and traversal/duplicate checks still apply.
            normalized = info.filename.replace("\\", "/")
            name = safe_path(normalized.rstrip("/"))
            if stat.S_ISLNK(info.external_attr >> 16):
                raise ValueError("Symlinks are not supported in mod ZIPs")
            if normalized.endswith("/"):
                continue
            if name in entries:
                raise ValueError("Duplicate ZIP path: " + name)
            entries[name] = archive.read(info)
    # Support one enclosing folder, as used by many manually prepared mod ZIPs.
    first = {name.split("/")[0] for name in entries}
    if len(first) == 1 and all("/" in name for name in entries) and next(iter(first)).lower() not in ("bepinex", "plugins", "patchers", "config"):
        entries = {name.split("/", 1)[1]: data for name, data in entries.items()}
    return entries


def dependencies(entries):
    if "manifest.json" not in entries:
        return []
    result = json.loads(entries["manifest.json"].decode("utf-8-sig")).get("dependencies", [])
    if not isinstance(result, list) or any(not isinstance(item, str) for item in result):
        raise ValueError("Invalid manifest dependencies")
    return result


def resolve_packages(requested, download=fetch):
    selected, roots, pinned = {}, [], {}
    for request in requested:
        match = PACKAGE.fullmatch(request)
        if not match:
            raise ValueError("Invalid Thunderstore package: " + request)
        key = "-".join(match.groups()[:2])
        roots.append(key)
        if match[3]:
            if key in pinned and pinned[key] != match[3]:
                raise ValueError("Conflicting pinned versions: " + key)
            pinned[key] = match[3]

    def visit(request, depth=0):
        match = PACKAGE.fullmatch(request)
        if not match or depth > 100 or len(selected) > 100:
            raise ValueError("Invalid or excessively large dependency graph")
        owner, name, version = match.groups()
        key = owner + "-" + name
        if key == LOADER:
            return  # The Docker image installs the Linux BepInEx runtime.
        if key in pinned:
            if version and tuple(map(int, version.split("."))) > tuple(map(int, pinned[key].split("."))):
                raise ValueError("Pinned version is below a dependency requirement: " + key)
            version = pinned[key]
        existing = selected.get(key)
        if existing and (not version or tuple(map(int, existing["version_number"].split("."))) >= tuple(map(int, version.split(".")))):
            return
        url = API + owner + "/" + name + "/" + (version + "/" if version else "")
        metadata = json.loads(download(url))
        metadata = metadata if version else metadata["latest"]
        if metadata["namespace"] != owner or metadata["name"] != name or not re.fullmatch(r"\d+\.\d+\.\d+", metadata["version_number"]):
            raise ValueError("Unexpected package metadata: " + key)
        if version and metadata["version_number"] != version:
            raise ValueError("Unexpected package version: " + key)
        selected[key] = metadata
        for dependency in metadata["dependencies"]:
            visit(dependency, depth + 1)

    for request in requested:
        visit(request)
    reachable = set()

    def mark(key):
        if key in reachable or key == LOADER:
            return
        reachable.add(key)
        for dependency in selected[key]["dependencies"]:
            mark("-".join(PACKAGE.fullmatch(dependency).groups()[:2]))

    for key in roots:
        mark(key)
    return {key: selected[key] for key in sorted(reachable)}


def map_archive(entries, package):
    mapped = {}
    for name, data in entries.items():
        parts = name.split("/")
        if parts[0].lower() == "bepinex":
            parts = parts[1:]
        if not parts:
            continue
        category = parts[0].lower()
        if category in ("core", "doorstop_libs"):
            continue  # Never replace the image's loader/runtime.
        if category in ("plugins", "patchers") and len(parts) > 1:
            destination = category + "/yml-generator/" + package + "/" + "/".join(parts[1:])
        elif category == "config" and len(parts) > 1:
            destination = "/".join(parts[1:])
            if destination.split("/")[0].lower() in ("plugins", "patchers") or destination.startswith("."):
                raise ValueError("Invalid config destination: " + destination)
        elif len(parts) == 1 and (category in ("manifest.json", "icon.png", "readme.md", "changelog.md") or category.startswith("license")):
            continue
        elif name.lower().endswith(".cfg"):
            destination = name
        else:
            destination = "plugins/yml-generator/" + package + "/" + name
        safe_path(destination)
        if destination in mapped:
            raise ValueError("Duplicate mod destination: " + destination)
        mapped[destination] = data
    return mapped


def install(bundle, config, download=fetch, refresh=False):
    definition_bytes = (bundle / "manifest.json").read_bytes()
    definition = json.loads(definition_bytes)
    if definition.get("loader") not in ("bepinex", "valheimplus"):
        raise ValueError("Select BepInEx or ValheimPlus before installing mods")
    root = config / definition["loader"]
    old_path = target_path(root, MANIFEST)
    old = json.loads(old_path.read_text("utf-8")) if old_path.exists() else {}
    fingerprint = hashlib.sha256(Path(__file__).read_bytes() + definition_bytes)
    uploaded = []
    for entry in definition.get("files", []):
        data = target_path(bundle / "uploads", entry["id"]).read_bytes()
        if len(data) > MAX_DOWNLOAD:
            raise ValueError("Uploaded file is too large")
        fingerprint.update(data)
        uploaded.append((entry, data))
    signature = fingerprint.hexdigest()
    if not refresh and old.get("fingerprint") == signature and all(target_path(root, path).is_file() for path in old.get("files", [])):
        print("[mods] Installed bundle unchanged; keeping existing mods and settings.", flush=True)
        return old

    planned, explicit_configs, requested = {}, set(), list(definition.get("packages", []))

    def add_files(files):
        for path, data in files.items():
            if path in planned and planned[path] != data:
                raise ValueError("Conflicting mod files: " + path)
            planned[path] = data
        if sum(map(len, planned.values())) > MAX_EXPANDED:
            raise ValueError("Combined mod files exceed 256 MiB")

    for entry, data in uploaded:
        name = safe_path(entry["name"])
        if "/" in name:
            raise ValueError("Uploaded filenames must not contain folders")
        package = "local-" + hashlib.sha256(name.encode("utf-8")).hexdigest()[:16]
        if name.lower().endswith(".zip"):
            entries = archive_entries(data)
            deps = dependencies(entries)
            requested.extend(deps)
            mapped = map_archive(entries, package)
            if not mapped and not deps:
                raise ValueError("ZIP contains no installable mod files: " + name)
            add_files(mapped)
        elif name.lower().endswith(".dll"):
            add_files({"plugins/yml-generator/" + package + "/" + name: data})
        else:
            raise ValueError("Unsupported mod file: " + name)

    resolved = resolve_packages(requested, download)
    for package, metadata in resolved.items():
        print("[mods] Downloading " + metadata["full_name"], flush=True)
        entries = archive_entries(download(metadata["download_url"]))
        add_files(map_archive(entries, package))

    for entry in definition.get("configs", []):
        name = safe_path(entry["name"])
        if not name.lower().endswith(".cfg") or name.split("/")[0].lower() in ("plugins", "patchers") or name.startswith("."):
            raise ValueError("Config filename must be a relative .cfg path")
        planned[name] = entry["content"].encode("utf-8")
        explicit_configs.add(name)

    # Validate every destination before modifying persistent data.
    for path in set(planned) | set(old.get("files", [])):
        target_path(root, path)
    root.mkdir(parents=True, exist_ok=True)
    backup = root / ".yml-generator-backups" / (time.strftime("%Y%m%d-%H%M%S") + "-" + str(time.time_ns()))
    target_path(root, str(backup.relative_to(root)).replace(os.sep, "/"))
    managed_prefixes = ("plugins/yml-generator/", "patchers/yml-generator/")
    changes = {}
    for path, data in planned.items():
        dest = target_path(root, path)
        # Package defaults must not reset settings edited on the server.
        if dest.exists() and not path.startswith(managed_prefixes) and path not in explicit_configs:
            continue
        if not dest.exists() or dest.read_bytes() != data:
            changes[path] = data
    for path in old.get("files", []):
        if path.startswith(managed_prefixes) and path not in planned:
            changes[path] = None

    previous = {}
    uid, gid = int(os.environ.get("PUID", "1000")), int(os.environ.get("PGID", "1000"))

    def write(path, data):
        dest = target_path(root, path)
        if data is None:
            dest.unlink(missing_ok=True)
            return
        dest.parent.mkdir(parents=True, exist_ok=True)
        with tempfile.NamedTemporaryFile(dir=dest.parent, delete=False) as temporary:
            temporary.write(data)
            temp_path = Path(temporary.name)
        try:
            os.chmod(temp_path, 0o644)
            os.replace(temp_path, dest)
        finally:
            temp_path.unlink(missing_ok=True)
        if hasattr(os, "chown") and os.geteuid() == 0:
            os.chown(dest, uid, gid)
            parent = dest.parent
            while parent != root.parent:
                os.chown(parent, uid, gid)
                parent = parent.parent

    try:
        for path, data in changes.items():
            dest = target_path(root, path)
            previous[path] = dest.read_bytes() if dest.exists() else None
            if previous[path] is not None:
                saved = backup / path
                saved.parent.mkdir(parents=True, exist_ok=True)
                saved.write_bytes(previous[path])
            write(path, data)
        result = {"fingerprint": signature, "files": sorted(planned), "packages": [m["full_name"] for m in resolved.values()]}
        write(MANIFEST, json.dumps(result, indent=2).encode("utf-8"))
    except Exception:
        for path, data in reversed(list(previous.items())):
            write(path, data)
        raise
    print("[mods] Ready: " + str(len(planned)) + " files; " + str(root), flush=True)
    return result


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--bundle", type=Path, default=Path("/mod-bundle"))
    parser.add_argument("--config", type=Path, default=Path("/config"))
    parser.add_argument("--refresh", action="store_true")
    args = parser.parse_args()
    try:
        install(args.bundle, args.config, refresh=args.refresh)
    except Exception as error:
        print("[mods] Installation failed; server startup stopped: " + str(error), file=sys.stderr, flush=True)
        sys.exit(1)
