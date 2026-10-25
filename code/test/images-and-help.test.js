const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const ImageCatalog = require('../image-catalog.js');
const ValheimSettings = require('../valheim-settings.js');
const ValheimMbround = require('../valheim-mbround.js');
const OptionHelp = {
  ...require('../help-palworld.js'),
  ...require('../help-palworld-ops.js'),
  ...require('../help-valheim-corekeeper.js')
};

function loadApp() {
  const listeners = new Map();
  const elements = new Map();
  const element = id => {
    if (!elements.has(id)) {
      elements.set(id, { innerHTML: '', textContent: '', hidden: false, classList: { add() {}, remove() {}, contains() { return false; } }, setAttribute() {} });
    }
    return elements.get(id);
  };
  ['yml-output', 'section-creator', 'section-connection', 'section-options', 'volume-settings-fields', 'pending-bar', 'pending-text', 'action-creator', 'action-options'].forEach(element);
  const document = {
    addEventListener(event, handler) {
      if (!listeners.has(event)) listeners.set(event, []);
      listeners.get(event).push(handler);
    },
    getElementById: id => elements.get(id) || null,
    querySelectorAll: () => []
  };
  const context = vm.createContext({
    console, document, window: {}, TextEncoder, setTimeout, clearTimeout,
    ValheimMods: require('../valheim-mods.js'),
    ValheimQol: require('../valheim-qol.js'),
    ValheimSettings, ValheimMbround, ImageCatalog, OptionHelp
  });
  const appPath = path.join(__dirname, '..', 'app.js');
  vm.runInContext(`${fs.readFileSync(appPath, 'utf8')}
;globalThis.__api = { defaultDraftState, state, clone, OPTIONS_SCHEMA, CORE_KEEPER_OPTIONS_SCHEMA, buildCoreKeeperComposeYaml, buildValheimMbComposeYaml, validateValheimSettings, generateComposeYaml, setGame, setCreator, setupVolumeAndGlobalListeners, isValidAppState, mergeSavedAppState, cronToKorean };`, context, { filename: appPath });
  const dispatch = (event, target) => (listeners.get(event) || []).forEach(handler => handler({ target }));
  return { api: context.__api, elements, dispatch };
}

test('every game offers the top two Docker Hub images ranked by pulls and stars', () => {
  for (const [game, entry] of Object.entries(ImageCatalog.games)) {
    assert.equal(entry.images.length, 2, game);
    const [first, second] = entry.images;
    assert.ok(first.pulls > second.pulls, `${game} pulls order`);
    assert.equal(ImageCatalog.rank(game, 'pulls', first.id), 1);
    assert.equal(ImageCatalog.rank(game, 'stars', first.id), 1);
    assert.equal(ImageCatalog.rank(game, 'pulls', second.id), 2);
  }
  assert.equal(ImageCatalog.imageRef('valheim', 'mbround18'), 'mbround18/valheim:3');
  assert.equal(ImageCatalog.imageRef('corekeeper', 'arguser'), 'arguser/core-keeper-dedicated:latest');
});

test('the image section lists both images with their rankings for every game', () => {
  const { api, elements } = loadApp();
  for (const game of ['palworld', 'corekeeper', 'valheim']) {
    api.setGame(game);
    const html = elements.get('section-creator').innerHTML;
    for (const image of ImageCatalog.games[game].images) assert.match(html, new RegExp(image.repo.replace('/', '\\/')));
    assert.match(html, /다운로드 1위/);
    assert.match(html, /다운로드 2위/);
    assert.match(html, /인기\(★\) 1위/);
  }
});

test('every setting in every schema has what/effect help text', () => {
  const { api } = loadApp();
  const keys = [
    ...api.OPTIONS_SCHEMA.common.map(opt => `palworld.${opt.key}`),
    ...api.OPTIONS_SCHEMA.thijsvanloef.map(opt => `palworld.${opt.key}`),
    ...api.OPTIONS_SCHEMA.jammsen.map(opt => `palworld.${opt.key}`),
    ...api.CORE_KEEPER_OPTIONS_SCHEMA.map(opt => `corekeeper.${opt.key}`),
    ...ValheimSettings.fields.map(field => `valheim.${field.key}`),
    ...['serverName', 'serverPassword', 'adminPassword', 'publicConnection', 'publicIp', 'publicPort', 'community', 'gamePort', 'queryPort', 'restApi', 'restApiPort', 'rcon', 'rconPort'].map(key => `palworld.connection.${key}`),
    ...['worldName', 'gameId', 'maxPlayers', 'directConnection', 'serverIp', 'serverPort', 'password', 'allowOnlyPlatform'].map(key => `corekeeper.connection.${key}`),
    ...['serverName', 'worldName', 'serverPassword', 'serverSecretFile', 'serverPort', 'serverPublic', 'crossplay'].map(key => `valheim.connection.${key}`)
  ];
  const isBulletList = value => Array.isArray(value) && value.length > 0 && value.every(item => typeof item === 'string' && item.trim());
  const missing = keys.filter(key => !OptionHelp[key] || !isBulletList(OptionHelp[key].what) || !isBulletList(OptionHelp[key].effect));
  assert.deepEqual(missing, []);
  const mbMissing = ValheimMbround.fields.filter(field => !field.help || !isBulletList(field.help.what) || !isBulletList(field.help.effect)).map(field => field.key);
  assert.deepEqual(mbMissing, []);
});

test('help text is written as 개조식 bullets, not 서술형 sentences', () => {
  const entries = [...Object.entries(OptionHelp), ...ValheimMbround.fields.map(field => [`valheimMb.${field.key}`, field.help])];
  const prose = [];
  for (const [key, help] of entries) {
    for (const part of ['what', 'effect', 'tip']) {
      for (const item of help[part] || []) {
        // 필요·중요 are nouns; only polite sentence endings count as 서술형.
        if (/(니다|세요|[어아여해]요|[이예]요)\.?$|\.$/.test(item.trim())) prose.push(`${key}.${part}: ${item}`);
      }
    }
  }
  assert.deepEqual(prose, []);
});

test('option rows render the help sentence and an expandable effect panel', () => {
  const { api, elements } = loadApp();
  api.setGame('palworld');
  const html = elements.get('section-options').innerHTML;
  assert.match(html, new RegExp(OptionHelp['palworld.expRate'].what[0].slice(0, 10).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.match(html, /class="help-bullets option-help-what"/);
  assert.match(html, /설정 효과/);
  assert.match(html, /class="help-toggle"/);
  assert.match(html, /id="option-search"/);
});

test('mbround18 Valheim compose uses rootless user, three ports, Odin variables and backup volume', () => {
  const { api } = loadApp();
  const applied = api.clone(api.defaultDraftState);
  applied.game = 'valheim';
  applied.valheimCreator = 'mbround18';
  applied.valheimConnection.serverPassword = 'secret-pass';
  applied.valheimConnection.serverName = 'My $erver';
  applied.valheimMbOptions.type = 'BepInEx';
  applied.valheimMbOptions.mods = 'ValheimModding-Jotunn-*\nOdinPlus-OdinHorse-1.4.12';
  applied.valheimMbOptions.combat = 'hard';
  applied.valheimMbOptions.raids = 'none';
  applied.valheimMbOptions.httpEnabled = true;

  const yaml = api.buildValheimMbComposeYaml(applied);
  assert.match(yaml, /image: mbround18\/valheim:3/);
  assert.match(yaml, /user: "1000:1000"/);
  assert.match(yaml, /"2456-2458:2456-2458\/udp"/);
  assert.match(yaml, /"127\.0\.0\.1:3000:3000\/tcp"/);
  assert.match(yaml, /:\/home\/steam\/\.config\/unity3d\/IronGate\/Valheim"/);
  assert.match(yaml, /\.\/valheim\/backups:\/home\/steam\/backups/);
  assert.match(yaml, /"NAME=My \$\$erver"/);
  assert.match(yaml, /"PASSWORD=secret-pass"/);
  assert.match(yaml, /"PUBLIC=1"/);
  assert.match(yaml, /"TYPE=BepInEx"/);
  assert.match(yaml, /"MODS=ValheimModding-Jotunn-\*\\nOdinPlus-OdinHorse-1\.4\.12"/);
  assert.match(yaml, /"MODIFIERS=combat=hard,raids=none"/);
  assert.match(yaml, /"AUTO_BACKUP=1"/);
  assert.match(yaml, /"HTTP_PORT=3000"/);
  assert.doesNotMatch(yaml, /SERVER_PASS|VALHEIM_PLUS_RELEASE|PRESET=/);
});

test('mbround18 validation rejects mods without a loader and bad cron', () => {
  const { api } = loadApp();
  const applied = api.clone(api.defaultDraftState);
  applied.game = 'valheim';
  applied.valheimCreator = 'mbround18';
  applied.valheimConnection.serverPassword = 'abc';
  applied.valheimMbOptions.mods = 'Some-Mod-1.0.0';
  applied.valheimMbOptions.autoBackupSchedule = 'every hour';
  const errors = api.validateValheimSettings(applied).join(' ');
  assert.match(errors, /5자 이상/);
  assert.match(errors, /모드 로더/);
  assert.match(errors, /Cron/);
});

test('arguser Core Keeper compose only writes the variables that image reads', () => {
  const { api } = loadApp();
  const applied = api.clone(api.defaultDraftState);
  applied.game = 'corekeeper';
  applied.coreKeeperCreator = 'arguser';
  applied.coreKeeperConnection.directConnection = true;
  applied.coreKeeperOptions.modsEnabled = true;
  const yaml = api.buildCoreKeeperComposeYaml(applied);
  assert.match(yaml, /image: arguser\/core-keeper-dedicated:latest/);
  assert.match(yaml, /WORLD_INDEX=0/);
  assert.match(yaml, /"WORLD_SEED=0"/);
  assert.match(yaml, /MAX_PLAYERS=10/);
  assert.doesNotMatch(yaml, /ports:|SERVER_PORT|MODS_ENABLED|PUID|WORLD_MODE/);
});

test('switching images re-renders options and apply-all applies every dirty step', () => {
  const { api, elements, dispatch } = loadApp();
  api.setupVolumeAndGlobalListeners();
  api.setGame('valheim');
  api.setCreator('mbround18');
  assert.match(elements.get('section-options').innerHTML, /AUTO_BACKUP_SCHEDULE/);
  assert.match(elements.get('volume-settings-fields').innerHTML, /backupsPath/);
  assert.equal(elements.get('pending-bar').hidden, false);
  api.state.draft.valheimConnection.serverPassword = 'hello-world';
  dispatch('click', { matches: selector => selector === '#btn-apply-all', dataset: {} });
  assert.equal(api.state.applied.game, 'valheim');
  assert.equal(api.state.applied.valheimCreator, 'mbround18');
  assert.match(elements.get('yml-output').textContent, /mbround18\/valheim:3/);
  assert.equal(elements.get('pending-bar').hidden, true);
});

test('saved states keep the selected images and reject unknown ones', () => {
  const { api } = loadApp();
  const saved = JSON.parse(JSON.stringify(api.defaultDraftState));
  saved.valheimCreator = 'mbround18';
  delete saved.valheimMbOptions;
  assert.equal(api.isValidAppState(saved), true);
  const merged = api.mergeSavedAppState(saved);
  assert.equal(merged.valheimCreator, 'mbround18');
  assert.equal(merged.valheimMbOptions.autoBackupSchedule, '*/15 * * * *');
  assert.equal(api.isValidAppState({ ...saved, coreKeeperCreator: 'nobody' }), false);
});

test('cron descriptions explain common schedules in Korean', () => {
  const { api } = loadApp();
  assert.equal(api.cronToKorean('*/15 * * * *'), '15분마다');
  assert.equal(api.cronToKorean('0 2 * * *'), '매일 2시 00분');
  assert.equal(api.cronToKorean('30 4 * * 0'), '매주 일요일 4시 30분');
  assert.match(api.cronToKorean(''), /실행하지 않습니다/);
});
