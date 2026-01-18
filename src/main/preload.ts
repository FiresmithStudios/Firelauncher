import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  github: {
    scanRepository: () => ipcRenderer.invoke('github:scan-repository'),
    getAppMetadata: (category: string, appId: string) => 
      ipcRenderer.invoke('github:get-app-metadata', category, appId),
    getVersionMetadata: (category: string, appId: string, versionFolder: string) => 
      ipcRenderer.invoke('github:get-version-metadata', category, appId, versionFolder),
  },
});
