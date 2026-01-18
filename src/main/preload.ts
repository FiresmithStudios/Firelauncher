import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Placeholder for IPC methods
  // Example: getApps: () => ipcRenderer.invoke('get-apps'),
});
