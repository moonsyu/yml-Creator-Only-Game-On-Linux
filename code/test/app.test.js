const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

function loadAppForTest() {
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
    'volume-settings-fields'
  ].map(id => [id, makeElement()]));
  const gameCards = ['palworld', 'corekeeper'].map(game => ({
    dataset: { game },
    classList: { add() {}, remove() {} },
    setAttribute() {}
  }));
  const output = elements.get('yml-output');
  const document = {
    addEventListener() {},
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
    setTimeout,
    clearTimeout
  });
  const appPath = path.join(__dirname, '..', 'app.js');
  const source = fs.readFileSync(appPath, 'utf8');
  vm.runInContext(
    `${source}\n;globalThis.__testApi = { defaultDraftState, state, clone, mergeSavedAppState, buildCoreKeeperComposeYaml, generateComposeYaml, renderAppSections, setGame, parseCoreKeeperContentBundles, toggleCoreKeeperContentBundle };`,
    context,
    { filename: appPath }
  );

  return { api: context.__testApi, elements, output };
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
