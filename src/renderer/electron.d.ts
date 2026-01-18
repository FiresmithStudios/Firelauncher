import { AppMetadata, VersionMetadata } from '../shared/types';

export interface ElectronAPI {
  github: {
    scanRepository: () => Promise<{ success: boolean; data?: AppMetadata[]; error?: string }>;
    getAppMetadata: (category: string, appId: string) => Promise<{ success: boolean; data?: AppMetadata | null; error?: string }>;
    getVersionMetadata: (category: string, appId: string, versionFolder: string) => Promise<{ success: boolean; data?: VersionMetadata | null; error?: string }>;
  };
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
