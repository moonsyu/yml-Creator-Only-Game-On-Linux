import importlib.util
import io
import json
from pathlib import Path
import stat
import tempfile
import unittest
import zipfile

spec = importlib.util.spec_from_file_location('installer', Path(__file__).parents[1] / 'templates' / 'valheim-install.py')
installer = importlib.util.module_from_spec(spec)
spec.loader.exec_module(installer)


def archive(files):
    buffer = io.BytesIO()
    with zipfile.ZipFile(buffer, 'w') as output:
        for name, value in files.items():
            output.writestr(name, value)
    return buffer.getvalue()


def metadata(owner, name, version='1.0.0', deps=None):
    return {'namespace': owner, 'name': name, 'version_number': version, 'full_name': f'{owner}-{name}-{version}',
            'dependencies': deps or [], 'download_url': f'https://thunderstore.io/package/download/{owner}/{name}/{version}/'}


class InstallerTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.base = Path(self.temp.name)
        self.bundle = self.base / 'bundle'
        (self.bundle / 'uploads').mkdir(parents=True)
        self.config = self.base / 'config'
        self.definition = {'loader': 'bepinex', 'packages': [], 'files': [], 'configs': []}

    def run_install(self, download=None):
        (self.bundle / 'manifest.json').write_text(json.dumps(self.definition), 'utf-8')
        return installer.install(self.bundle, self.config, download or (lambda url: self.fail('Unexpected network: ' + url)))

    def upload(self, name, data):
        file_id = 'fixture-' + str(len(self.definition['files']))
        (self.bundle / 'uploads' / file_id).write_bytes(data)
        self.definition['files'].append({'id': file_id, 'name': name})

    def test_zip_and_dll_and_configs_land_in_image_paths(self):
        self.upload('Example.zip', archive({'BepInEx/plugins/Example/a.dll': b'plugin', 'BepInEx/patchers/Patch.dll': b'patch', 'BepInEx/config/Example.cfg': b'default', 'README.md': b'docs'}))
        self.upload('Extra.dll', b'extra')
        self.definition['configs'] = [{'name': 'Example.cfg', 'content': '[General]\nEnabled = true\n'}]
        result = self.run_install()
        root = self.config / 'bepinex'
        self.assertEqual((root / 'Example.cfg').read_text(), '[General]\nEnabled = true\n')
        self.assertEqual(len(list(root.glob('plugins/yml-generator/**/*.dll'))), 2)
        self.assertEqual(len(list(root.glob('patchers/yml-generator/**/*.dll'))), 1)
        self.assertFalse(any('README' in file for file in result['files']))

    def test_same_bundle_preserves_runtime_config_without_network(self):
        self.definition['configs'] = [{'name': 'Example.cfg', 'content': 'first'}]
        self.run_install()
        (self.config / 'bepinex' / 'Example.cfg').write_text('edited on server')
        self.run_install()
        self.assertEqual((self.config / 'bepinex' / 'Example.cfg').read_text(), 'edited on server')

    def test_update_backs_up_files_and_removal_only_prunes_managed_plugins(self):
        self.upload('Example.dll', b'old')
        self.definition['configs'] = [{'name': 'Example.cfg', 'content': 'old config'}]
        self.run_install()
        root = self.config / 'bepinex'
        (root / 'plugins' / 'manual.dll').write_bytes(b'unmanaged')
        (self.bundle / 'uploads' / 'fixture-0').write_bytes(b'new')
        self.definition['configs'][0]['content'] = 'new config'
        self.run_install()
        self.assertTrue(any(p.read_bytes() == b'old' for p in root.glob('.yml-generator-backups/**/*.dll')))
        self.assertTrue(any(p.read_bytes() == b'old config' for p in root.glob('.yml-generator-backups/**/*.cfg')))
        self.definition['files'] = []
        self.definition['configs'] = []
        self.run_install()
        self.assertEqual(list(root.glob('plugins/yml-generator/**/*.dll')), [])
        self.assertEqual((root / 'plugins' / 'manual.dll').read_bytes(), b'unmanaged')
        self.assertEqual((root / 'Example.cfg').read_text(), 'new config')

    def test_dependency_resolution_skips_image_loader_and_downloads_transitive_mods(self):
        self.definition['packages'] = ['Team-Root']
        root = metadata('Team', 'Root', deps=['Team-Library-1.0.0', installer.LOADER + '-5.4.0'])
        library = metadata('Team', 'Library')
        responses = {
            installer.API + 'Team/Root/': json.dumps({'latest': root}).encode(),
            installer.API + 'Team/Library/1.0.0/': json.dumps(library).encode(),
            root['download_url']: archive({'Root.dll': b'root'}),
            library['download_url']: archive({'Library.dll': b'lib'})
        }
        result = self.run_install(lambda url: responses[url])
        self.assertEqual(result['packages'], ['Team-Library-1.0.0', 'Team-Root-1.0.0'])
        self.run_install()  # same bundle needs no network

    def test_uploaded_manifest_dependencies_are_installed(self):
        self.upload('Modpack.zip', archive({'manifest.json': json.dumps({'dependencies': ['Team-Lib-1.0.0']})}))
        library = metadata('Team', 'Lib')
        responses = {installer.API + 'Team/Lib/1.0.0/': json.dumps(library).encode(), library['download_url']: archive({'lib.dll': b'library'})}
        result = self.run_install(lambda url: responses[url])
        self.assertEqual(result['packages'], ['Team-Lib-1.0.0'])

    def test_failed_download_does_not_modify_existing_install(self):
        self.upload('Existing.dll', b'good')
        result = self.run_install()
        self.definition['packages'] = ['Missing-Mod']
        with self.assertRaises(RuntimeError):
            self.run_install(lambda url: (_ for _ in ()).throw(RuntimeError('offline')))
        root = self.config / 'bepinex'
        self.assertEqual((root / result['files'][0]).read_bytes(), b'good')
        self.assertEqual(json.loads((root / installer.MANIFEST).read_text()), result)

    def test_zip_traversal_and_symlinks_rejected_before_writes(self):
        for name in ['../escape.dll', '/absolute.dll', 'C:/escape.dll', 'BepInEx/../../escape.dll']:
            with self.subTest(name=name), self.assertRaises(ValueError):
                installer.archive_entries(archive({name: b'bad'}))
        with self.assertRaises(ValueError):
            installer.safe_path('dir\\escape.dll')
        info = zipfile.ZipInfo('link.dll')
        info.create_system = 3
        info.external_attr = (stat.S_IFLNK | 0o777) << 16
        with self.assertRaises(ValueError):
            installer.archive_entries(archive({info: b'/outside'}))
        self.assertFalse(self.config.exists())

    def test_package_defaults_preserve_existing_config(self):
        root = self.config / 'bepinex'
        root.mkdir(parents=True)
        (root / 'Existing.cfg').write_text('custom')
        self.upload('Example.zip', archive({'plugins/a.dll': b'plugin', 'config/Existing.cfg': b'default'}))
        self.run_install()
        self.assertEqual((root / 'Existing.cfg').read_text(), 'custom')

    def test_windows_zip_paths_are_normalized_before_validation(self):
        # Replace filename bytes after creation: Python on Windows otherwise
        # normalizes them on write and hides the real Linux installation failure.
        data = archive({'plugins/Mod.dll': b'plugin', 'config/Mod.cfg': b'custom'})
        data = data.replace(b'plugins/', b'plugins\\').replace(b'config/', b'config\\')
        self.upload('WindowsMod.zip', data)
        result = self.run_install()
        root = self.config / 'bepinex'
        self.assertEqual((root / 'Mod.cfg').read_bytes(), b'custom')
        self.assertTrue(any(path.endswith('/Mod.dll') for path in result['files']))
        bad = archive({'../escape.dll': b'bad'}).replace(b'../escape.dll', b'..\\escape.dll')
        with self.assertRaises(ValueError):
            installer.archive_entries(bad)
        duplicate = archive({'plugins/Mod.dll': b'one', 'pluginsXMod.dll': b'two'})
        duplicate = duplicate.replace(b'pluginsXMod.dll', b'plugins\\Mod.dll')
        with self.assertRaisesRegex(ValueError, 'Duplicate ZIP path'):
            installer.archive_entries(duplicate)

    def test_valheim_plus_uses_its_separate_directory(self):
        self.definition['loader'] = 'valheimplus'
        self.upload('Mod.dll', b'plugin')
        self.run_install()
        self.assertTrue(list((self.config / 'valheimplus').glob('plugins/yml-generator/**/*.dll')))
        self.assertFalse((self.config / 'bepinex').exists())

    def test_conflicting_explicit_pins_fail_clearly(self):
        with self.assertRaisesRegex(ValueError, 'Conflicting pinned'):
            installer.resolve_packages(['Team-Mod-1.0.0', 'Team-Mod-2.0.0'])


if __name__ == '__main__':
    unittest.main()
