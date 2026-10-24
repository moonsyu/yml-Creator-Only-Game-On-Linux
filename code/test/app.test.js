const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

function loadAppForTest() {
  const listeners = new Map();
  const makeElement = () => ({
    innerHTML: '',
    textContent: '',
    classList: { add() {}, remove() {}, contains() { return false; } },
    setAttribute() {}
  });
  const elements = new Map([
    'yml-output',
    'action-game',
    'action-creator',
    'action-volume',
    'action-connection',
    'action-options',
    'section-creator',
    'section-connection',
    'section-options',
    'volume-settings-fields',
    'yaml-validation',
    'btn-download-yml',
    'btn-download-bundle',
    'bundle-help',
    'section-valheim-mods',
    'action-valheim-mods',
    'section-valheim-qol',
    'action-valheim-qol',
    'preview-title'
  ].map(id => [id, makeElement()]));
  const gameCards = ['palworld', 'corekeeper', 'valheim'].map(game => ({
    dataset: { game },
    classList: { add() {}, remove() {} },
    setAttribute() {}
  }));
  const output = elements.get('yml-output');
  const document = {
    addEventListener(event, handler) {
      if (!listeners.has(event)) listeners.set(event, []);
      listeners.get(event).push(handler);
    },
    getElementById(id) {
      return elements.get(id) || null;
    },
    querySelectorAll(selector) {
      return selector === '.game-card' ? gameCards : [];
    }
  };
  const context = vm.createContext({
    console,
    document,
    window: {},
    TextEncoder,
    ValheimMods: require('../valheim-mods.js'),
    ValheimQol: require('../valheim-qol.js'),
    ValheimSettings: require('../valheim-settings.js'),
    setTimeout,
    clearTimeout
  });
  const appPath = path.join(__dirname, '..', 'app.js');
  const source = fs.readFileSync(appPath, 'utf8');
  vm.runInContext(
    `${source}\n;globalThis.__testApi = { defaultDraftState, state, clone, isValidAppState, mergeSavedAppState, buildCoreKeeperComposeYaml, buildValheimComposeYaml, validateValheimSettings, generateComposeYaml, renderAppSections, setGame, setupVolumeAndGlobalListeners, parseCoreKeeperContentBundles, toggleCoreKeeperContentBundle };`,
    context,
    { filename: appPath }
  );

  const dispatch = (event, target) => (listeners.get(event) || []).forEach(handler => handler({ target }));
  return { api: context.__testApi, elements, output, dispatch };
}

test('Core Keeper SDR compose uses the documented image and persistent volumes', () => {
  const { api } = loadAppForTest();
  const applied = api.clone(api.defaultDraftState);
  applied.game = 'corekeeper';

  const yaml = api.buildCoreKeeperComposeYaml(applied);

  assert.match(yaml, /image: escaping\/core-keeper-dedicated:latest/);
  assert.match(yaml, /stop_grace_period: 2m/);
  assert.match(yaml, /\.\/core-keeper-files:\/home\/steam\/core-keeper-dedicated/);
  assert.match(yaml, /\.\/core-keeper-data:\/home\/steam\/core-keeper-data/);
  assert.match(yaml, /WORLD_NAME=Core Keeper Server/);
  assert.match(yaml, /MAX_PLAYERS=10/);
  assert.doesNotMatch(yaml, /^    ports:/m);
  assert.doesNotMatch(yaml, /SERVER_PORT=/);
});

test('Core Keeper direct connection compose publishes UDP and includes direct settings', () => {
  const { api } = loadAppForTest();
  const applied = api.clone(api.defaultDraftState);
  applied.game = 'corekeeper';
  applied.coreKeeperConnection.directConnection = true;
  applied.coreKeeperConnection.serverPort = 27016;
  applied.coreKeeperConnection.serverIp = '0.0.0.0';
  applied.coreKeeperConnection.password = 'cave-pass';
  applied.coreKeeperConnection.allowOnlyPlatform = '1';

  const yaml = api.buildCoreKeeperComposeYaml(applied);

  assert.match(yaml, /"27016:27016\/udp"/);
  assert.match(yaml, /SERVER_IP=0\.0\.0\.0/);
  assert.match(yaml, /SERVER_PORT=27016/);
  assert.match(yaml, /PASSWORD=cave-pass/);
  assert.match(yaml, /ALLOW_ONLY_PLATFORM=1/);
});

test('Core Keeper selected content bundles are written to compose', () => {
  const { api } = loadAppForTest();
  const applied = api.clone(api.defaultDraftState);
  applied.game = 'corekeeper';
  applied.coreKeeperOptions.activateContent = 'GiantCicadaBossDungeon,BiomeStatues';

  const yaml = api.buildCoreKeeperComposeYaml(applied);

  assert.match(yaml, /ACTIVATE_CONTENT=GiantCicadaBossDungeon,BiomeStatues/);
  assert.match(yaml, /ACTIVATE_ALL_CONTENT=false/);
});

test('Core Keeper content bundle toggle preserves order and handles legacy all-content state', () => {
  const { api } = loadAppForTest();
  const options = api.clone(api.defaultDraftState.coreKeeperOptions);

  api.toggleCoreKeeperContentBundle(options, 'BiomeStatues');
  api.toggleCoreKeeperContentBundle(options, 'GiantCicadaBossDungeon');
  assert.equal(options.activateContent, 'GiantCicadaBossDungeon,BiomeStatues');

  options.activateContent = '';
  options.activateAllContent = true;
  api.toggleCoreKeeperContentBundle(options, 'GuaranteedOases');
  assert.equal(options.activateAllContent, false);
  assert.deepEqual(
    Array.from(api.parseCoreKeeperContentBundles(options.activateContent)),
    ['GiantCicadaBossDungeon', 'NatureBiomeCicadas', 'BiomeStatues', 'AbioticFactor']
  );
});

test('Core Keeper compose safely quotes special characters', () => {
  const { api } = loadAppForTest();
  const applied = api.clone(api.defaultDraftState);
  applied.game = 'corekeeper';
  applied.coreKeeperConnection.worldName = 'Cave "A"\nSecond floor';
  applied.coreKeeperVolume.dataPath = 'D:\\Core Keeper\\data';

  const yaml = api.buildCoreKeeperComposeYaml(applied);

  assert.match(yaml, /"WORLD_NAME=Cave \\"A\\"\\nSecond floor"/);
  assert.match(yaml, /"D:\\\\Core Keeper\\\\data:\/home\/steam\/core-keeper-data"/);
});

test('legacy Palworld saved state receives Core Keeper defaults', () => {
  const { api } = loadAppForTest();
  const legacy = api.clone(api.defaultDraftState);
  delete legacy.game;
  delete legacy.coreKeeperConnection;
  delete legacy.coreKeeperOptions;
  delete legacy.coreKeeperVolume;

  const merged = api.mergeSavedAppState(legacy);

  assert.equal(merged.game, 'palworld');
  assert.equal(merged.coreKeeperConnection.worldName, 'Core Keeper Server');
  assert.equal(merged.coreKeeperVolume.dataPath, './core-keeper-data');
});

test('generateComposeYaml writes Core Keeper output for an applied Core Keeper state', () => {
  const { api, output } = loadAppForTest();
  api.state.applied = api.clone(api.defaultDraftState);
  api.state.applied.game = 'corekeeper';

  api.generateComposeYaml();

  assert.match(output.textContent, /^services:\n  core-keeper:/);
});

test('selecting Core Keeper renders all Core Keeper sections', () => {
  const { api, elements } = loadAppForTest();

  api.setGame('corekeeper');

  assert.match(elements.get('section-creator').innerHTML, /escaping\/core-keeper-dedicated:latest/);
  assert.match(elements.get('section-connection').innerHTML, /Core Keeper 접속 설정/);
  assert.match(elements.get('section-connection').innerHTML, /SDR 사용/);
  assert.match(elements.get('section-options').innerHTML, /Core Keeper 서버 옵션/);
  assert.match(elements.get('section-options').innerHTML, /WORLD_MODE/);
  const optionsHtml = elements.get('section-options').innerHTML;
  assert.ok(optionsHtml.indexOf('Creative · 창작 모드') < optionsHtml.indexOf('Casual · 쉬움'));
  assert.ok(optionsHtml.indexOf('Casual · 쉬움') < optionsHtml.indexOf('Normal · 보통'));
  assert.ok(optionsHtml.indexOf('Normal · 보통') < optionsHtml.indexOf('Hard · 어려움'));
  assert.equal((optionsHtml.match(/class="content-bundle-btn /g) || []).length, 5);
  assert.match(optionsHtml, /모래 속 여왕/);
  assert.match(optionsHtml, /오아시스와 드롬블/);
  assert.match(optionsHtml, /6개의 타이탄 성소/);
  assert.match(optionsHtml, /연구 시설 균열/);
  assert.match(optionsHtml, /href="https:\/\/mod\.io\/g\/corekeeper"/);
  assert.match(optionsHtml, /href="https:\/\/mod\.io\/me\/access"/);
  assert.match(optionsHtml, /core-keeper-dedicated#mod-support/);
  assert.match(optionsHtml, /target="_blank" rel="noopener noreferrer"/);
  assert.match(elements.get('volume-settings-fields').innerHTML, /core-keeper-data/);
  assert.match(elements.get('action-game').innerHTML, /data-section="game"/);
});

function validValheimState(api) {
  const applied = api.clone(api.defaultDraftState);
  applied.game = 'valheim';
  applied.valheimConnection.serverPassword = 'test-password';
  return applied;
}

test('Valheim compose keeps world and server data and uses the documented Steam ports', () => {
  const { api } = loadAppForTest();
  const yaml = api.buildValheimComposeYaml(validValheimState(api));

  assert.match(yaml, /^services:\n  valheim:/);
  assert.match(yaml, /image: lloesche\/valheim-server:latest/);
  assert.match(yaml, /stop_grace_period: 2m/);
  assert.match(yaml, /cap_add:\n      - SYS_NICE/);
  assert.match(yaml, /"2456-2457:2456-2457\/udp"/);
  assert.match(yaml, /"\.\/valheim-config:\/config"/);
  assert.match(yaml, /"\.\/valheim-data:\/opt\/valheim"/);
  assert.match(yaml, /"SERVER_PORT=2456"/);
  assert.match(yaml, /"CROSSPLAY=false"/);
  assert.match(yaml, /"BACKUPS=true"/);
  assert.match(yaml, /"TZ=Asia\/Seoul"/);
  assert.doesNotMatch(yaml, /ADMINLIST_IDS|BANNEDLIST_IDS|PERMITTEDLIST_IDS|9001:9001|palworld|core-keeper/);
});

test('Valheim custom ports follow SERVER_PORT and include the third port for crossplay', () => {
  const { api } = loadAppForTest();
  const applied = validValheimState(api);
  applied.valheimConnection.serverPort = 3456;
  applied.valheimConnection.crossplay = true;
  applied.valheimConnection.serverPublic = false;
  const yaml = api.buildValheimComposeYaml(applied);

  assert.match(yaml, /"3456-3458:3456-3458\/udp"/);
  assert.match(yaml, /"SERVER_PORT=3456"/);
  assert.match(yaml, /"CROSSPLAY=true"/);
  assert.match(yaml, /"SERVER_PUBLIC=false"/);
  applied.valheimConnection.serverPort = 65533;
  assert.match(api.buildValheimComposeYaml(applied), /"65533-65535:65533-65535\/udp"/);
});

test('Valheim rejects missing identity, short passwords and invalid port ranges', () => {
  const { api } = loadAppForTest();
  for (const password of ['', '1234', null]) {
    const applied = validValheimState(api);
    applied.valheimConnection.serverPassword = password;
    assert.throws(() => api.buildValheimComposeYaml(applied), /5자 이상/);
  }
  for (const port of [1023, 65534, 65535, 2456.5, null, '2456']) {
    const applied = validValheimState(api);
    applied.valheimConnection.serverPort = port;
    assert.throws(() => api.buildValheimComposeYaml(applied), /1024~65533/);
  }
  const applied = validValheimState(api);
  applied.valheimConnection.serverPassword = '12345';
  assert.doesNotThrow(() => api.buildValheimComposeYaml(applied));
  applied.valheimConnection.serverName = '  ';
  applied.valheimConnection.worldName = '';
  assert.equal(api.validateValheimSettings(applied).length, 2);
});

test('Valheim empty schedules explicitly disable periodic jobs and lists are opt-in', () => {
  const { api } = loadAppForTest();
  const applied = validValheimState(api);
  Object.assign(applied.valheimOptions, {
    updateCron: '', restartCron: '', backupsCron: '', backups: false,
    updateIfIdle: false, restartIfIdle: false, backupsMaxAge: 7, backupsMaxCount: 24,
    adminIds: '76561198000000001 76561198000000002', bannedIds: '  ',
    permittedIds: '76561198000000001', serverArgs: '-preset hard',
    puid: 1001, pgid: 1002
  });
  const yaml = api.buildValheimComposeYaml(applied);

  for (const name of ['UPDATE_CRON', 'RESTART_CRON', 'BACKUPS_CRON']) assert.ok(yaml.includes(`"${name}="`));
  for (const entry of ['BACKUPS=false', 'UPDATE_IF_IDLE=false', 'RESTART_IF_IDLE=false', 'BACKUPS_MAX_AGE=7', 'BACKUPS_MAX_COUNT=24', 'PUID=1001', 'PGID=1002', 'SERVER_ARGS=-preset hard']) {
    assert.ok(yaml.includes(`"${entry}"`), entry);
  }
  assert.match(yaml, /ADMINLIST_IDS=76561198000000001 76561198000000002/);
  assert.match(yaml, /PERMITTEDLIST_IDS=76561198000000001/);
  assert.doesNotMatch(yaml, /BANNEDLIST_IDS/);
});

test('Valheim mod loader selection cannot enable BepInEx and ValheimPlus together', () => {
  const { api } = loadAppForTest();
  const applied = validValheimState(api);
  for (const mode of ['vanilla', 'bepinex', 'valheimplus']) {
    applied.valheimOptions.modMode = mode;
    const yaml = api.buildValheimComposeYaml(applied);
    assert.ok(yaml.includes(`"BEPINEX=${mode === 'bepinex'}"`));
    assert.ok(yaml.includes(`"VALHEIM_PLUS=${mode === 'valheimplus'}"`));
    assert.doesNotMatch(yaml, /BEPINEX \/ VALHEIM_PLUS=/);
  }
  applied.valheimOptions.modMode = 'unknown';
  assert.throws(() => api.buildValheimComposeYaml(applied), /모드 로더/);
});

test('Valheim convenience settings apply with their loader, restore, persist, and reset', () => {
  const { api, elements, dispatch, output } = loadAppForTest();
  api.setupVolumeAndGlobalListeners();
  api.state.draft = validValheimState(api);
  api.state.applied = validValheimState(api);
  api.state.draft.valheimQol = require('../valheim-qol.js').preset();
  api.renderAppSections();
  assert.match(elements.get('section-valheim-qol').innerHTML, /광물·금속 포탈 통과/);
  assert.match(elements.get('section-valheim-qol').innerHTML, /기본 운반 무게/);
  assert.match(elements.get('section-valheim-qol').innerHTML, /추천 편의값 채우기/);
  assert.doesNotMatch(api.buildValheimComposeYaml(api.state.applied), /VPCFG_/);

  const click = (selector, section) => dispatch('click', { matches: value => value === selector, dataset: { section } });
  click('.btn-apply', 'valheimQol');
  assert.equal(api.state.draft.valheimOptions.modMode, 'valheimplus');
  assert.equal(api.state.applied.valheimOptions.modMode, 'valheimplus');
  assert.match(output.textContent, /VPCFG_Items_noTeleportPrevention=true/);
  assert.match(output.textContent, /VPCFG_Player_baseMaximumWeight=600/);
  assert.match(output.textContent, /VPCFG_Items_itemStackMultiplier=100/);
  assert.match(output.textContent, /VPCFG_Stamina_runStaminaDrain=-25/);
  assert.equal(elements.get('btn-download-yml').disabled, true);
  assert.equal(elements.get('btn-download-bundle').disabled, false);
  api.state.draft.valheimQol.carryWeight = 999;
  click('.btn-restore', 'valheimQol');
  assert.equal(api.state.draft.valheimQol.carryWeight, 600);
  const saved = api.mergeSavedAppState(JSON.parse(JSON.stringify(api.state.applied)));
  assert.equal(saved.valheimQol.carryWeight, 600);
  assert.equal(api.buildValheimComposeYaml(saved), output.textContent);
  for (const game of ['corekeeper', 'palworld', 'valheim']) api.setGame(game);
  assert.equal(api.state.draft.valheimQol.carryWeight, 600);
  click('#btn-reset-all');
  assert.equal(api.state.draft.valheimQol.enabled, false);
  assert.equal(elements.get('section-valheim-qol').hidden, true);
});

test('Valheim convenience errors block output, and old saves preserve manual config', () => {
  const { api, elements, output } = loadAppForTest();
  const legacy = validValheimState(api);
  delete legacy.valheimQol;
  const merged = api.mergeSavedAppState(legacy);
  assert.equal(merged.valheimQol.enabled, false);
  assert.doesNotMatch(api.buildValheimComposeYaml(merged), /VPCFG_/);
  api.state.applied = merged;
  merged.valheimQol.enabled = true;
  api.generateComposeYaml();
  assert.equal(output.textContent, '');
  assert.match(elements.get('yaml-validation').textContent, /ValheimPlus가 필요/);
  merged.valheimOptions.modMode = 'valheimplus';
  merged.valheimQol.carryWeight = null;
  api.generateComposeYaml();
  assert.equal(elements.get('btn-download-bundle').disabled, true);
  assert.match(elements.get('yaml-validation').textContent, /기본 운반 무게/);
});

test('Valheim escapes YAML and Compose interpolation in user text and volume paths', () => {
  const { api } = loadAppForTest();
  const applied = validValheimState(api);
  applied.valheimConnection.serverName = 'Viking "Hall"\nSecond line';
  applied.valheimConnection.serverPassword = 'a$PASS${WORD}#:\\"';
  applied.valheimVolume.configPath = './worlds/$name';
  applied.valheimVolume.dataPath = 'D:\\Valheim\\data';
  const yaml = api.buildValheimComposeYaml(applied);
  const entries = yaml.split('\n').filter(line => line.startsWith('      - "')).map(line => JSON.parse(line.slice(8)));

  assert.ok(entries.includes('SERVER_NAME=Viking "Hall"\nSecond line'));
  assert.ok(entries.includes('SERVER_PASS=a$$PASS$${WORD}#:\\"'));
  assert.ok(entries.includes('./worlds/$$name:/config'));
  assert.ok(entries.includes('D:\\Valheim\\data:/opt/valheim'));
});

test('older saved states acquire Valheim defaults and new states survive JSON persistence', () => {
  const { api } = loadAppForTest();
  for (const game of ['palworld', 'corekeeper']) {
    const legacy = api.clone(api.defaultDraftState);
    legacy.game = game;
    delete legacy.valheimConnection;
    delete legacy.valheimOptions;
    delete legacy.valheimVolume;
    assert.ok(api.isValidAppState(legacy));
    const merged = api.mergeSavedAppState(legacy);
    assert.equal(merged.game, game);
    assert.equal(merged.valheimConnection.serverPort, 2456);
    assert.equal(merged.valheimVolume.configPath, './valheim-config');
  }
  const saved = validValheimState(api);
  saved.valheimOptions.backups = false;
  saved.valheimOptions.restartCron = '';
  saved.valheimVolume.configPath = './existing-world';
  const roundTrip = api.mergeSavedAppState(JSON.parse(JSON.stringify(saved)));
  assert.ok(api.isValidAppState(roundTrip));
  assert.equal(JSON.stringify(roundTrip), JSON.stringify(saved));
  roundTrip.valheimConnection = null;
  assert.equal(api.isValidAppState(roundTrip), false);
  saved.game = 'toString';
  assert.equal(api.isValidAppState(saved), false);
});

test('Valheim validation blocks output and download until valid applied settings exist', () => {
  const { api, elements, output } = loadAppForTest();
  api.state.applied.game = 'valheim';
  api.generateComposeYaml();
  assert.equal(output.textContent, '');
  assert.equal(elements.get('btn-download-yml').disabled, true);
  assert.equal(elements.get('yaml-validation').hidden, false);
  assert.match(elements.get('yaml-validation').textContent, /5자 이상/);

  api.state.applied.valheimConnection.serverPassword = 'test-password';
  api.generateComposeYaml();
  assert.match(output.textContent, /valheim-server:latest/);
  assert.equal(elements.get('btn-download-yml').disabled, false);
  assert.equal(elements.get('yaml-validation').hidden, true);

  api.state.applied.valheimConnection.serverPassword = '';
  api.generateComposeYaml();
  api.state.applied.game = 'corekeeper';
  api.generateComposeYaml();
  assert.equal(elements.get('btn-download-yml').disabled, false);
  assert.equal(elements.get('yaml-validation').hidden, true);
  assert.match(output.textContent, /core-keeper-dedicated:latest/);
});

test('Valheim sections apply and restore independently and survive switching games', () => {
  const { api, elements, output, dispatch } = loadAppForTest();
  api.setupVolumeAndGlobalListeners();
  const click = (selector, section) => dispatch('click', { matches: value => value === selector, dataset: { section } });
  api.setGame('valheim');
  assert.match(elements.get('section-creator').innerHTML, /community-valheim-tools/);
  assert.match(elements.get('section-connection').innerHTML, /Valheim 접속 설정/);
  assert.match(elements.get('section-options').innerHTML, /BACKUPS_CRON/);
  assert.match(elements.get('volume-settings-fields').innerHTML, /valheimConfigPath/);
  assert.match(elements.get('action-connection').innerHTML, /data-section="valheimConnection"/);
  assert.equal(api.state.applied.game, 'palworld');
  click('.btn-apply', 'game');
  api.state.draft.valheimConnection.serverPassword = 'new-password';
  api.state.draft.valheimOptions.backups = false;
  click('.btn-apply', 'valheimConnection');
  assert.match(output.textContent, /SERVER_PASS=new-password/);
  assert.match(output.textContent, /BACKUPS=true/);
  click('.btn-restore', 'valheimOptions');
  assert.equal(api.state.draft.valheimOptions.backups, true);
  api.state.draft.valheimOptions.backups = false;
  click('.btn-apply', 'valheimOptions');
  assert.match(output.textContent, /BACKUPS=false/);
  dispatch('input', { matches: value => value === '[data-volume-key]', dataset: { volumeKey: 'configPath' }, value: './my-world' });
  click('.btn-apply', 'valheimVolume');
  assert.match(output.textContent, /\.\/my-world:\/config/);
  api.state.draft.valheimVolume.configPath = './discard';
  click('.btn-restore', 'valheimVolume');
  assert.equal(api.state.draft.valheimVolume.configPath, './my-world');

  for (const game of ['corekeeper', 'palworld', 'valheim']) api.setGame(game);
  assert.equal(api.state.draft.valheimConnection.serverPassword, 'new-password');
  assert.equal(api.state.draft.connection.serverPassword, '');
  assert.equal(api.state.draft.coreKeeperConnection.password, '');
  api.state.draft.valheimConnection.serverPassword = 'discard';
  click('.btn-restore', 'valheimConnection');
  assert.equal(api.state.draft.valheimConnection.serverPassword, 'new-password');
  click('#btn-reset-all');
  assert.equal(api.state.draft.game, 'palworld');
  assert.equal(api.state.applied.valheimConnection.serverPassword, '');
  assert.match(output.textContent, /palworld-server-docker/);
});

test('mod application includes the loader and installer while preserving unrelated options', () => {
  const { api, elements, output, dispatch } = loadAppForTest();
  api.setupVolumeAndGlobalListeners();
  api.state.draft = validValheimState(api);
  api.state.applied = validValheimState(api);
  api.state.draft.valheimOptions.modMode = 'bepinex';
  api.state.draft.valheimOptions.backups = false;
  api.state.draft.valheimMods.packages = 'Team-Mod-1.0.0';
  const click = (selector, section) => dispatch('click', { matches: value => value === selector, dataset: { section } });
  click('.btn-apply', 'valheimMods');
  assert.equal(api.state.applied.valheimOptions.modMode, 'bepinex');
  assert.equal(api.state.applied.valheimOptions.backups, true);
  assert.match(output.textContent, /\.\/valheim-mods:\/mod-bundle:ro/);
  assert.match(output.textContent, /PRE_SUPERVISOR_HOOK=python3 \/mod-bundle\/install.py --bundle \/mod-bundle --config \/config \|\| exit 1/);
  assert.equal(elements.get('btn-download-yml').disabled, true);
  assert.equal(elements.get('btn-download-bundle').hidden, false);
  assert.equal(elements.get('btn-download-bundle').disabled, false);
  api.state.draft.valheimMods.packages = 'Team-Other';
  click('.btn-restore', 'valheimMods');
  assert.equal(api.state.draft.valheimMods.packages, 'Team-Mod-1.0.0');
  api.state.draft.valheimMods.packages = '';
  assert.equal(api.state.applied.valheimMods.packages, 'Team-Mod-1.0.0');
});

test('saved uploads block incomplete bundles and old saves receive empty mod settings', () => {
  const { api, elements, output } = loadAppForTest();
  const legacy = validValheimState(api);
  delete legacy.valheimMods;
  assert.ok(api.isValidAppState(legacy));
  assert.equal(api.mergeSavedAppState(legacy).valheimMods.files.length, 0);
  api.state.applied = validValheimState(api);
  api.state.applied.valheimOptions.modMode = 'bepinex';
  api.state.applied.valheimMods.files = [{ id: 'saved-file', name: 'Mod.dll', size: 10 }];
  api.generateComposeYaml();
  assert.equal(output.textContent, '');
  assert.equal(elements.get('btn-download-bundle').disabled, true);
  assert.match(elements.get('yaml-validation').textContent, /첨부 파일을 다시 선택/);
  api.state.applied.game = 'corekeeper';
  api.generateComposeYaml();
  assert.equal(elements.get('btn-download-bundle').hidden, true);
  assert.equal(elements.get('btn-download-yml').disabled, false);
});

test('native world rules work without a mod loader and presets precede overrides', () => {
  const { api } = loadAppForTest();
  const applied = validValheimState(api);
  Object.assign(applied.valheimOptions, { worldPreset: 'normal', portals: 'casual', combat: 'easy', resources: 'more', raids: 'none', nobuildcost: 'enabled', saveInterval: 600, nativeBackups: 0, backupShort: 3600, backupLong: 7200, instanceId: 'qa-1' });
  const yaml = api.buildValheimComposeYaml(applied);
  assert.match(yaml, /SERVER_ARGS=-preset normal -modifier combat easy -modifier resources more -modifier raids none -modifier portals casual -setkey nobuildcost -saveinterval 600 -backups 0 -backupshort 3600 -backuplong 7200 -instanceid qa-1/);
  assert.match(yaml, /BEPINEX=false/);
  assert.match(yaml, /VALHEIM_PLUS=false/);
  assert.doesNotMatch(yaml, /mod-bundle|VPCFG_/);
});

test('HTTP services publish only when enabled and password files use Compose secrets', () => {
  const { api } = loadAppForTest();
  const applied = validValheimState(api);
  applied.valheimConnection.serverPassword = '';
  applied.valheimConnection.serverSecretFile = './private/server$pass.txt';
  Object.assign(applied.valheimOptions, { statusHttp: true, statusHttpPort: 8081, statusHostPort: 18080,
    supervisorHttp: true, supervisorHttpPort: 9002, supervisorHostPort: 19001, supervisorSecretFile: './private/admin.txt', supervisorHttpPass: 'must-not-appear' });
  const yaml = api.buildValheimComposeYaml(applied);
  assert.match(yaml, /127\.0\.0\.1:18080:8081\/tcp/);
  assert.match(yaml, /127\.0\.0\.1:19001:9002\/tcp/);
  assert.match(yaml, /SERVER_PASS_FILE=\/run\/secrets\/server_pass/);
  assert.match(yaml, /SUPERVISOR_HTTP_PASS_FILE=\/run\/secrets\/supervisor_pass/);
  assert.match(yaml, /secrets:\n  server_pass:\n    file: "\.\/private\/server\$\$pass.txt"/);
  assert.doesNotMatch(yaml, /SERVER_PASS=|SUPERVISOR_HTTP_PASS=|must-not-appear/);
  applied.valheimOptions.statusHttp = false;
  applied.valheimOptions.supervisorHttp = false;
  assert.doesNotMatch(api.buildValheimComposeYaml(applied), /\/tcp/);
});

test('invalid HTTP, Cron, world, numeric and extra settings block generation', () => {
  const { api } = loadAppForTest();
  for (const change of [
    { statusHttp: true, statusBind: '999.0.0.1' },
    { supervisorHttp: true },
    { statusHttp: true, supervisorHttp: true, supervisorHttpPass: 'qa', supervisorHttpPort: 80 },
    { updateCron: '60 * * * *' }, { backupsCron: '* * *' }, { restartCron: '*/0 * * * *' },
    { permissionsUmask: '888' }, { saveInterval: 0 }, { nativeBackups: 1.5 }, { portals: 'unknown' },
    { instanceId: 'two words' }, { serverArgs: '-savedir /tmp' }, { saveInterval: 600, serverArgs: '-saveinterval 900' },
    { combat: 'easy', serverArgs: '-preset hard' }, { portals: 'casual', serverArgs: '-modifier portals hard' },
    { extraEnvironment: 'SERVER_PORT=9000' }, { extraEnvironment: 'PRE_SUPERVISOR_HOOK=exit 0' },
    { extraEnvironment: 'KEY=value\nKEY=second' }, { extraEnvironment: 'not-an-entry' },
    { extraEnvironment: 'IDLE_DATAGRAM_WINDOW=10' }, { extraEnvironment: 'VPCFG_Server_maxPlayers=20' }
  ]) {
    const applied = validValheimState(api);
    Object.assign(applied.valheimOptions, change);
    assert.throws(() => api.buildValheimComposeYaml(applied), undefined, JSON.stringify(change));
  }
  const applied = validValheimState(api);
  applied.valheimConnection.serverPublic = false;
  applied.valheimOptions.statusHttp = true;
  assert.throws(() => api.buildValheimComposeYaml(applied), /서버 목록 공개/);
});

test('extra mod configuration and lifecycle hooks preserve literals and mandatory installation', () => {
  const { api } = loadAppForTest();
  const applied = validValheimState(api);
  Object.assign(applied.valheimOptions, { modMode: 'valheimplus',
    PRE_SUPERVISOR_HOOK: 'echo "$SERVER_NAME"\nprintf done', POST_BACKUP_HOOK: 'echo @BACKUP_FILE@',
    extraEnvironment: 'VPCFG_Server_maxPlayers=20\nBEPINEXCFG_Logging_DOT_Console_Enabled=true\nVALHEIM_LOG_FILTER_CONTAINS_Join=joined\nON_VALHEIM_LOG_FILTER_CONTAINS_Join=echo "$SERVER_NAME"' });
  const yaml = api.buildValheimComposeYaml(applied);
  const entries = yaml.split('\n').filter(line => line.startsWith('      - "')).map(line => JSON.parse(line.slice(8)));
  assert.ok(entries.includes('PRE_SUPERVISOR_HOOK=python3 /mod-bundle/install.py --bundle /mod-bundle --config /config || exit 1\necho "$$SERVER_NAME"\nprintf done'));
  assert.ok(entries.includes('ON_VALHEIM_LOG_FILTER_CONTAINS_Join=echo "$$SERVER_NAME"'));
  assert.match(yaml, /VPCFG_Server_maxPlayers=20/);
  applied.valheimQol = require('../valheim-qol.js').preset();
  assert.throws(() => api.buildValheimComposeYaml(applied), /VPCFG_Server_maxPlayers.*중복/);
});

test('one Valheim options action applies and restores rules, loader, configs and convenience together', () => {
  const { api, dispatch, elements, output } = loadAppForTest();
  api.setupVolumeAndGlobalListeners();
  api.state.draft = validValheimState(api);
  api.state.applied = validValheimState(api);
  api.state.draft.valheimOptions.portals = 'casual';
  api.state.draft.valheimQol = require('../valheim-qol.js').preset();
  api.state.draft.valheimMods.configs = [{ name: 'Example.cfg', content: '[Example]\nenabled=true' }];
  const click = selector => dispatch('click', { matches: value => value === selector, dataset: { section: 'valheimOptions' } });
  api.renderAppSections();
  assert.equal(elements.get('preview-title').textContent, '5. YML 미리보기');
  assert.match(elements.get('section-options').innerHTML, /id="section-valheim-qol"/);
  assert.match(elements.get('section-options').innerHTML, /월드 난이도/);
  assert.doesNotMatch(elements.get('section-valheim-mods').innerHTML, /<h2>|action-valheim-mods/);
  click('.btn-apply');
  assert.match(output.textContent, /-modifier portals casual/);
  assert.match(output.textContent, /VPCFG_Player_baseMaximumWeight=600/);
  assert.equal(api.state.applied.valheimOptions.modMode, 'valheimplus');
  assert.equal(api.state.applied.valheimMods.configs.length, 1);
  api.state.draft.valheimOptions.portals = 'hard';
  api.state.draft.valheimQol.carryWeight = 800;
  api.state.draft.valheimMods.configs = [];
  click('.btn-restore');
  assert.equal(api.state.draft.valheimOptions.portals, 'casual');
  assert.equal(api.state.draft.valheimQol.carryWeight, 600);
  assert.equal(api.state.draft.valheimMods.configs.length, 1);
});

test('older Valheim settings gain new controls without resetting worlds or schedules', () => {
  const { api } = loadAppForTest();
  const saved = validValheimState(api);
  saved.valheimOptions = { modMode: 'bepinex', updateCron: '', serverArgs: '-preset hard', backupsMaxAge: 14 };
  delete saved.valheimConnection.serverSecretFile;
  const restored = api.mergeSavedAppState(saved);
  assert.equal(restored.valheimOptions.portals, '');
  assert.equal(restored.valheimOptions.statusHttp, false);
  assert.equal(restored.valheimConnection.serverSecretFile, '');
  const yaml = api.buildValheimComposeYaml(restored);
  assert.match(yaml, /SERVER_ARGS=-preset hard/);
  assert.match(yaml, /UPDATE_CRON="/);
  assert.match(yaml, /BACKUPS_MAX_AGE=14/);
});

test('password-free access requires explicit ValheimPlus selection and setting', () => {
  const { api } = loadAppForTest();
  const applied = validValheimState(api);
  applied.valheimConnection.serverPassword = '';
  applied.valheimOptions.modMode = 'valheimplus';
  applied.valheimQol = { ...require('../valheim-qol.js').preset(), maxPlayers: 20, disableServerPassword: true };
  assert.match(api.buildValheimComposeYaml(applied), /VPCFG_Server_maxPlayers=20/);
  assert.match(api.buildValheimComposeYaml(applied), /VPCFG_Server_disableServerPassword=true/);
  applied.valheimQol.disableServerPassword = false;
  assert.throws(() => api.buildValheimComposeYaml(applied), /5자 이상/);
});
