const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('node:fs/promises');
const path = require('node:path');
const { pathToFileURL, URL } = require('node:url');

const STORAGE_DIRECTORY_NAME = 'pal-server-yml-data';
const STATE_FILE_NAME = 'app-state.json';
const GENERATED_YAML_FILE_NAME = 'generated-compose.yml';
const STORAGE_VERSION = 1;
const MAX_SAVE_PAYLOAD_BYTES = 1024 * 1024;
const MAX_STATE_SECTION_BYTES = 512 * 1024;
const MAX_YAML_BYTES = 512 * 1024;
const MAX_OBJECT_DEPTH = 20;
const MAX_OBJECT_NODES = 2000;
const ALLOWED_SAVE_KEYS = new Set(['draft', 'applied', 'yaml']);
const UNSAFE_OBJECT_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

function getAppIndexPath() {
  return path.join(__dirname, 'index.html');
}

function getAppIndexUrl() {
  return pathToFileURL(getAppIndexPath()).toString();
}

function getStoragePaths() {
  const storageDirectory = path.join(app.getPath('userData'), STORAGE_DIRECTORY_NAME);

  return {
    storageDirectory,
    stateFile: path.join(storageDirectory, STATE_FILE_NAME),
    generatedYamlFile: path.join(storageDirectory, GENERATED_YAML_FILE_NAME)
  };
}

function isPlainObject(value) {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function jsonByteLength(value, label) {
  try {
    return Buffer.byteLength(JSON.stringify(value), 'utf8');
  } catch {
    throw new TypeError(`${label} must be JSON serializable`);
  }
}

function assertSerializableValue(value, label, depth, seen) {
  if (depth > MAX_OBJECT_DEPTH) {
    throw new TypeError(`${label} is too deeply nested`);
  }

  seen.count += 1;
  if (seen.count > MAX_OBJECT_NODES) {
    throw new TypeError(`${label} is too complex`);
  }

  if (value === null) {
    return;
  }

  const valueType = typeof value;
  if (valueType === 'string' || valueType === 'boolean') {
    return;
  }

  if (valueType === 'number') {
    if (!Number.isFinite(value)) {
      throw new TypeError(`${label} contains an invalid number`);
    }
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      assertSerializableValue(item, `${label}[${index}]`, depth + 1, seen);
    });
    return;
  }

  if (!isPlainObject(value)) {
    throw new TypeError(`${label} must contain only plain JSON values`);
  }

  Object.keys(value).forEach((key) => {
    if (UNSAFE_OBJECT_KEYS.has(key)) {
      throw new TypeError(`${label} contains an unsafe key`);
    }
    assertSerializableValue(value[key], `${label}.${key}`, depth + 1, seen);
  });
}

function normalizeStateSection(value, label) {
  if (!isPlainObject(value)) {
    throw new TypeError(`${label} must be a plain object`);
  }

  assertSerializableValue(value, label, 0, { count: 0 });

  if (jsonByteLength(value, label) > MAX_STATE_SECTION_BYTES) {
    throw new TypeError(`${label} is too large`);
  }

  return JSON.parse(JSON.stringify(value));
}

function validateSavePayload(payload) {
  if (!isPlainObject(payload)) {
    throw new TypeError('Save payload must be a plain object');
  }

  const payloadKeys = Object.keys(payload);
  payloadKeys.forEach((key) => {
    if (!ALLOWED_SAVE_KEYS.has(key)) {
      throw new TypeError(`Unsupported save field: ${key}`);
    }
  });

  if (jsonByteLength(payload, 'Save payload') > MAX_SAVE_PAYLOAD_BYTES) {
    throw new TypeError('Save payload is too large');
  }

  const normalizedPayload = {};
  if (Object.prototype.hasOwnProperty.call(payload, 'draft')) {
    normalizedPayload.draft = normalizeStateSection(payload.draft, 'draft');
  }
  if (Object.prototype.hasOwnProperty.call(payload, 'applied')) {
    normalizedPayload.applied = normalizeStateSection(payload.applied, 'applied');
  }
  if (Object.prototype.hasOwnProperty.call(payload, 'yaml')) {
    if (typeof payload.yaml !== 'string') {
      throw new TypeError('yaml must be a string');
    }
    if (Buffer.byteLength(payload.yaml, 'utf8') > MAX_YAML_BYTES) {
      throw new TypeError('yaml is too large');
    }
    normalizedPayload.yaml = payload.yaml;
  }

  return normalizedPayload;
}

async function ensureStorageDirectory() {
  const storagePaths = getStoragePaths();
  await fs.mkdir(storagePaths.storageDirectory, { recursive: true });
  return storagePaths;
}

async function readTextFileIfExists(filePath, maxBytes) {
  try {
    const fileStats = await fs.stat(filePath);
    if (!fileStats.isFile() || fileStats.size > maxBytes) {
      return null;
    }
    return await fs.readFile(filePath, 'utf8');
  } catch (error) {
    if (error && error.code === 'ENOENT') {
      return null;
    }
    throw error;
  }
}

async function readJsonFileSafely(filePath) {
  const fileContents = await readTextFileIfExists(filePath, MAX_SAVE_PAYLOAD_BYTES);
  if (fileContents === null || fileContents.trim() === '') {
    return null;
  }

  try {
    const parsed = JSON.parse(fileContents);
    if (!isPlainObject(parsed)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

async function writeFileAtomically(filePath, contents) {
  const temporaryFilePath = `${filePath}.${process.pid}.${Date.now()}.${Math.random().toString(16).slice(2)}.tmp`;
  await fs.writeFile(temporaryFilePath, contents, 'utf8');
  await fs.rename(temporaryFilePath, filePath);
}

async function loadSavedData() {
  const storagePaths = getStoragePaths();
  const savedState = await readJsonFileSafely(storagePaths.stateFile);
  const generatedYaml = await readTextFileIfExists(storagePaths.generatedYamlFile, MAX_YAML_BYTES);
  const response = {
    version: STORAGE_VERSION,
    draft: null,
    applied: null,
    yaml: generatedYaml === null ? '' : generatedYaml,
    savedAt: null,
    hasSavedData: false
  };

  if (savedState !== null) {
    response.savedAt = typeof savedState.savedAt === 'string' ? savedState.savedAt : null;
    response.hasSavedData = true;

    try {
      if (Object.prototype.hasOwnProperty.call(savedState, 'draft')) {
        response.draft = normalizeStateSection(savedState.draft, 'draft');
      }
      if (Object.prototype.hasOwnProperty.call(savedState, 'applied')) {
        response.applied = normalizeStateSection(savedState.applied, 'applied');
      }
    } catch {
      response.draft = null;
      response.applied = null;
    }
  }

  if (generatedYaml !== null) {
    response.hasSavedData = true;
  }

  return response;
}

async function saveSavedData(payload) {
  const normalizedPayload = validateSavePayload(payload);
  const storagePaths = await ensureStorageDirectory();
  const savedAt = new Date().toISOString();
  const stateToWrite = {
    version: STORAGE_VERSION,
    savedAt
  };

  if (Object.prototype.hasOwnProperty.call(normalizedPayload, 'draft')) {
    stateToWrite.draft = normalizedPayload.draft;
  }
  if (Object.prototype.hasOwnProperty.call(normalizedPayload, 'applied')) {
    stateToWrite.applied = normalizedPayload.applied;
  }

  await writeFileAtomically(
    storagePaths.stateFile,
    `${JSON.stringify(stateToWrite, null, 2)}\n`
  );

  if (Object.prototype.hasOwnProperty.call(normalizedPayload, 'yaml')) {
    await writeFileAtomically(storagePaths.generatedYamlFile, normalizedPayload.yaml);
  }

  return {
    ok: true,
    version: STORAGE_VERSION,
    savedAt
  };
}

async function resetSavedData() {
  const storagePaths = getStoragePaths();
  await Promise.all([
    fs.rm(storagePaths.stateFile, { force: true }),
    fs.rm(storagePaths.generatedYamlFile, { force: true })
  ]);

  return {
    ok: true,
    version: STORAGE_VERSION
  };
}

function assertAllowedIpcSender(event) {
  const senderUrl = event.senderFrame && event.senderFrame.url ? event.senderFrame.url : event.sender.getURL();

  if (!isAllowedAppNavigation(senderUrl, getAppIndexUrl())) {
    throw new Error('Unauthorized storage request');
  }
}

function registerStorageIpcHandlers() {
  ipcMain.handle('pal-storage:load', (event) => {
    assertAllowedIpcSender(event);
    return loadSavedData();
  });
  ipcMain.handle('pal-storage:save', (event, payload) => {
    assertAllowedIpcSender(event);
    return saveSavedData(payload);
  });
  ipcMain.handle('pal-storage:reset', (event) => {
    assertAllowedIpcSender(event);
    return resetSavedData();
  });
  ipcMain.handle('pal-storage:export-yml', async (event, content) => {
    assertAllowedIpcSender(event);
    if (typeof content !== 'string') {
      return { success: false, error: 'Invalid content type' };
    }

    let finalContent = content;
    if (!finalContent.startsWith('\uFEFF')) {
      finalContent = '\uFEFF' + finalContent;
    }

    if (Buffer.byteLength(finalContent, 'utf8') > MAX_YAML_BYTES) {
      return { success: false, error: 'Content size exceeds limit' };
    }
    
    const { dialog, BrowserWindow } = require('electron');
    const browserWindow = BrowserWindow.fromWebContents(event.sender);
    
    try {
      const { filePath } = await dialog.showSaveDialog(browserWindow, {
        title: 'YML 파일 저장',
        defaultPath: 'docker-compose.yml',
        filters: [{ name: 'YAML', extensions: ['yml', 'yaml'] }]
      });
      
      if (filePath) {
        await fs.writeFile(filePath, finalContent, 'utf8');
        return { success: true, filePath };
      }
      return { success: false, canceled: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  });
}

function isAllowedAppNavigation(navigationUrl, appIndexUrl) {
  try {
    const requestedUrl = new URL(navigationUrl);
    const allowedUrl = new URL(appIndexUrl);

    return requestedUrl.protocol === allowedUrl.protocol &&
      requestedUrl.pathname === allowedUrl.pathname &&
      requestedUrl.search === allowedUrl.search &&
      requestedUrl.hash === allowedUrl.hash;
  } catch {
    return false;
  }
}

function createWindow() {
  const appIndexPath = getAppIndexPath();
  const appIndexUrl = getAppIndexUrl();

  const mainWindow = new BrowserWindow({
    width: 1180,
    height: 860,
    title: '팰월드 서버 YML 생성기',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  mainWindow.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));

  mainWindow.webContents.on('will-navigate', (event, navigationUrl) => {
    if (!isAllowedAppNavigation(navigationUrl, appIndexUrl)) {
      event.preventDefault();
    }
  });

  mainWindow.loadFile(appIndexPath);
}

app.whenReady().then(() => {
  registerStorageIpcHandlers();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
