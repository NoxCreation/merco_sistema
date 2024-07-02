// En tu archivo preload.js
const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  toggleFrame: () => ipcRenderer.send('toggle-frame'),
});
