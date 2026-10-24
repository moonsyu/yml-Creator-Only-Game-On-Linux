const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');
const mods = require('../valheim-mods.js');
const fflate = require('../vendor/fflate-0.8.2.js');

test('Thunderstore input accepts current and legacy links, IDs and pinned versions', () => {
  assert.deepEqual(mods.parsePackages([
    'https://thunderstore.io/c/valheim/p/ValheimModding/Jotunn/',
    'ValheimModding-Jotunn',
    'https://valheim.thunderstore.io/package/Team/Mod/1.2.3/',
    'https://thunderstore.io/package/download/Team/Other/2.0.0/',
    'Team_2-My_Mod-1.0.0'
  ].join('\n')), ['ValheimModding-Jotunn', 'Team-Mod-1.2.3', 'Team-Other-2.0.0', 'Team_2-My_Mod-1.0.0']);
  for (const input of ['https://example.com/A/B', 'https://thunderstore.io.evil.test/package/A/B/', 'http://thunderstore.io/package/A/B/', 'https://user:pass@thunderstore.io/package/A/B/', 'A-B;curl bad', '../foo', 'https://thunderstore.io/c/other/p/A/B/']) {
    assert.throws(() => mods.parsePackages(input), undefined, input);
  }
});

test('mod configuration rejects missing uploads, oversized files and unsafe config names', () => {
  const state = { packages: '', files: [{ id: 'id-1', name: 'mod.dll', size: 10 }], configs: [] };
  assert.match(mods.validate(state, 'bepinex', new Map()).join(), /다시 선택/);
  assert.match(mods.validate(state, 'vanilla').join(), /BepInEx/);
  state.files[0].size = mods.MAX_UPLOAD_BYTES + 1;
  assert.match(mods.validate(state, 'bepinex').join(), /32 MiB/);
  for (const name of ['../outside.cfg', '/absolute.cfg', 'C:/outside.cfg', 'plugins/bad.cfg', 'patchers/bad.cfg', 'a\\b.cfg', '.hidden.cfg', 'a//b.cfg']) assert.equal(mods.safeConfigName(name), false, name);
  assert.equal(mods.safeConfigName('Mod/settings.cfg'), true);
  state.files = [];
  state.configs = [{ name: 'A.cfg', content: 'x' }, { name: 'A.cfg', content: 'y' }];
  assert.match(mods.validate(state, 'bepinex').join(), /중복/);
  state.configs = [0, 1, 2].map(i => ({ name: `${i}.cfg`, content: 'x'.repeat(100 * 1024) }));
  assert.match(mods.validate(state, 'bepinex').join(), /합계 256 KiB/);
});

test('execution bundle includes binary uploads, exact config text, installer and Compose', () => {
  const applied = { valheimOptions: { modMode: 'bepinex' }, valheimMods: {
    packages: 'Team-Mod-1.2.3', files: [{ id: 'fixture-id', name: '테스트.dll', size: 4 }],
    configs: [{ name: 'Example.cfg', content: '[General]\nText = $한글\n' }]
  }};
  const binary = Uint8Array.from([0, 255, 1, 127]);
  const bytes = mods.buildBundle(applied, 'services:\n  valheim: {}\n', new Map([['fixture-id', binary]]), '# installer\n', fflate.zipSync);
  const entries = fflate.unzipSync(bytes);
  assert.deepEqual(entries['valheim-mods/uploads/fixture-id'], binary);
  assert.equal(fflate.strFromU8(entries['docker-compose.yml']), 'services:\n  valheim: {}\n');
  assert.equal(fflate.strFromU8(entries['valheim-mods/install.py']), '# installer\n');
  const manifest = JSON.parse(fflate.strFromU8(entries['valheim-mods/manifest.json']));
  assert.deepEqual(manifest.packages, ['Team-Mod-1.2.3']);
  assert.equal(manifest.configs[0].content, applied.valheimMods.configs[0].content);
  assert.match(fflate.strFromU8(entries['실행방법.txt']), /docker compose up -d/);
});

test('embedded installer matches the reviewed Python source', () => {
  const root = path.join(__dirname, '..');
  const embedded = vm.runInNewContext(fs.readFileSync(path.join(root, 'valheim-installer-source.js'), 'utf8') + '\nVALHEIM_MOD_INSTALLER_SOURCE');
  assert.equal(embedded, fs.readFileSync(path.join(root, 'templates', 'valheim-install.py'), 'utf8').replace(/\r\n/g, '\n'));
});
