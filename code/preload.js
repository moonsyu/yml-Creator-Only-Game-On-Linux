const { contextBridge, ipcRenderer } = require('electron');

const STORAGE_CHANNELS = Object.freeze({
  load: 'pal-storage:load',
  save: 'pal-storage:save',
  reset: 'pal-storage:reset'
});

function requirePlainObject(value) {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    throw new TypeError('Save payload must be a plain object');
  }
}

const desktopBridge = Object.freeze({
  appName: '팰월드 서버 YML 생성기',
  platform: 'electron',
  storageVersion: 1,
  loadSavedData: () => ipcRenderer.invoke(STORAGE_CHANNELS.load),
  saveSavedData: (payload) => {
    requirePlainObject(payload);
    return ipcRenderer.invoke(STORAGE_CHANNELS.save, payload);
  },
  resetSavedData: () => ipcRenderer.invoke(STORAGE_CHANNELS.reset)
});

contextBridge.exposeInMainWorld('palServerDesktop', desktopBridge);
