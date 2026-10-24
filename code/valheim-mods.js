// Shared by the static web app, Electron renderer and Node tests.
(function (root) {
    const MAX_UPLOAD_BYTES = 32 * 1024 * 1024;
    const MAX_CONFIG_BYTES = 128 * 1024;
    const ID = /^[A-Za-z0-9_]+-[A-Za-z0-9_]+(?:-\d+\.\d+\.\d+)?$/;

    function parsePackages(text) {
        const packages = [];
        for (const line of String(text).split(/\r?\n/)) {
            let value = line.trim();
            if (!value) continue;
            if (/^https?:\/\//i.test(value)) {
                const url = new URL(value);
                if (url.protocol !== 'https:' || !['thunderstore.io', 'valheim.thunderstore.io'].includes(url.hostname) || url.username || url.password || url.port) {
                    throw new Error('Thunderstore의 HTTPS 모드 링크를 입력하세요.');
                }
                const match = url.pathname.match(/^\/(?:c\/valheim\/p|package|package\/download)\/([A-Za-z0-9_]+)\/([A-Za-z0-9_]+)(?:\/(\d+\.\d+\.\d+))?\/?$/);
                if (!match) throw new Error('모드 상세 페이지 또는 버전 링크를 입력하세요: ' + value);
                value = [match[1], match[2], match[3]].filter(Boolean).join('-');
            }
            if (!ID.test(value)) throw new Error('모드 ID는 제작자-모드명 또는 제작자-모드명-1.2.3 형식입니다: ' + value);
            if (!packages.includes(value)) packages.push(value);
        }
        if (packages.length > 100) throw new Error('모드는 최대 100개까지 입력할 수 있습니다.');
        return packages;
    }

    function safeConfigName(name) {
        return typeof name === 'string' && /\.cfg$/i.test(name) &&
            !/[\\:\x00-\x1f]/.test(name) && !name.startsWith('.') &&
            name.split('/').every(part => part && part !== '.' && part !== '..') &&
            !/^(plugins|patchers)\//i.test(name);
    }

    function hasContent(mods) {
        return Boolean(mods && (mods.packages.trim() || mods.files.length || mods.configs.length));
    }

    function validate(mods, loader, files) {
        const errors = [];
        try { parsePackages(mods.packages); } catch (error) { errors.push(error.message); }
        if (hasContent(mods) && loader === 'vanilla') errors.push('모드를 사용하려면 BepInEx 또는 ValheimPlus를 선택하고 적용하세요.');
        let size = 0;
        for (const file of mods.files) {
            if (!/^[A-Za-z0-9_-]+$/.test(file.id) || /[\\/:\x00-\x1f]/.test(file.name) || !/\.(zip|dll)$/i.test(file.name)) errors.push('ZIP 또는 DLL 파일을 다시 선택하세요.');
            size += file.size;
            if (files && !files.has(file.id)) errors.push('첨부 파일을 다시 선택하고 모드를 적용하세요: ' + file.name);
        }
        if (size > MAX_UPLOAD_BYTES) errors.push('첨부 모드 파일은 합계 32 MiB 이하로 선택하세요.');
        const names = new Set();
        for (const config of mods.configs) {
            if (!safeConfigName(config.name)) errors.push('설정 파일 이름은 상대 경로의 .cfg 파일이어야 합니다.');
            if (names.has(config.name)) errors.push('중복된 설정 파일 이름입니다: ' + config.name);
            names.add(config.name);
            if (new TextEncoder().encode(config.content).length > MAX_CONFIG_BYTES) errors.push('설정 파일은 각각 128 KiB 이하로 입력하세요.');
        }
        if (new TextEncoder().encode(JSON.stringify(mods)).length > 256 * 1024) errors.push('모드 목록과 설정 텍스트의 저장 크기는 합계 256 KiB 이하로 입력하세요.');
        return errors;
    }

    function buildBundle(applied, yaml, files, installerSource, zip) {
        const mods = applied.valheimMods;
        const errors = validate(mods, applied.valheimOptions.modMode, files);
        if (errors.length) throw new Error(errors.join(' '));
        const encode = text => new TextEncoder().encode(text);
        const manifest = {
            version: 1,
            loader: applied.valheimOptions.modMode,
            packages: parsePackages(mods.packages),
            files: mods.files.map(file => ({ id: file.id, name: file.name })),
            configs: mods.configs
        };
        const entries = {
            'docker-compose.yml': encode(yaml),
            'valheim-mods/install.py': encode(installerSource),
            'valheim-mods/manifest.json': encode(JSON.stringify(manifest, null, 2)),
            '실행방법.txt': encode(
                '1. 이 ZIP 전체를 Linux 서버의 한 폴더에 압축 해제하세요.\n' +
                '2. 그 폴더에서 docker compose up -d 를 실행하세요.\n' +
                '3. docker compose logs -f valheim 으로 모드 설치와 서버 시작을 확인하세요.\n\n' +
                '서버 시작 전에 Thunderstore 모드와 의존 모드, 첨부 ZIP/DLL, .cfg 설정을 설치합니다.\n' +
                '클라이언트에도 설치해야 하는 모드는 각 플레이어가 별도로 설치해야 합니다.\n' +
                (applied.valheimOptions.modMode === 'valheimplus' ?
                    'ValheimPlus는 서버와 각 PC에 같은 버전이 필요합니다. PC 설치: https://github.com/Grantapher/ValheimPlus/releases/latest\n' +
                    '편의 설정에서 지정한 값은 서버 시작 시 valheim_plus.cfg에 반영되며, 같은 항목의 직접 입력값보다 우선합니다.\n' +
                    '편의 기능을 해제할 때는 생성기에서 해당 기능을 끄거나 편의 기능 기본값을 적용하고 새 묶음으로 교체하세요. 기존 설정 유지는 이미 적용된 값을 되돌리지 않습니다.\n' : '') +
                '처음 설치한 버전은 같은 묶음으로 재시작할 때 유지됩니다. 버전을 바꾸려면 모드 ID에 버전을 지정해 새 묶음을 만드세요.\n' +
                'ZIP의 manifest.json에 있는 의존 모드는 자동 설치합니다. DLL만 첨부한 경우 필요한 의존 모드를 목록에 추가하세요.\n' +
                '기존 설정은 보존하며, 편집란에 입력한 .cfg만 명시적으로 덮어씁니다. 교체 전 파일은 .yml-generator-backups에 보관합니다.\n' +
                '묶음의 모드를 변경할 때는 먼저 docker compose down 으로 서버를 멈춘 뒤 파일을 교체하세요.\n' +
                '월드 폴더는 삭제하지 마세요. 기존 설치 경로를 그대로 사용하는지 확인하세요.\n'
            )
        };
        for (const file of mods.files) entries['valheim-mods/uploads/' + file.id] = files.get(file.id);
        return zip(entries, { level: 0 });
    }

    const api = { MAX_UPLOAD_BYTES, MAX_CONFIG_BYTES, parsePackages, safeConfigName, hasContent, validate, buildBundle };
    if (typeof module === 'object' && module.exports) module.exports = api;
    else root.ValheimMods = api;
})(typeof window === 'undefined' ? globalThis : window);
