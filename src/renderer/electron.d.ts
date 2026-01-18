export interface ElectronAPI {
  // IPC methods will be defined here
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
