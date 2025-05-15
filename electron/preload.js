const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  'electron',
  {
    copyFile: (filePath) => ipcRenderer.invoke('copy-file', filePath)
  }
); 