// Application metadata types
export interface AppMetadata {
  id: string;
  title: string;
  description: string;
  author: string;
  category: 'game' | 'application';
  tags: string[];
  images: {
    icon?: string;
    banner?: string;
    screenshots?: string[];
  };
  versions: Record<string, VersionInfo>;
  repository: {
    owner: string;
    repo: string;
  };
}

export interface VersionInfo {
  folder: string;
  releaseDate: string;
  changelog: string;
}

export interface VersionMetadata {
  version: string;
  executable: string;
  executableArgs?: string[];
  workingDirectory?: string | null;
  releaseDate: string;
  changelog: string;
  downloadUrl: string;
  fileSize: number;
  checksum?: string | null;
  dependencies?: {
    runtime?: string;
    directX?: string;
  };
  minimumOsVersion?: string;
  requirements?: {
    ram?: string;
    disk?: string;
  };
}

// Installed application type
export interface InstalledApp {
  id: string;
  installedVersion: string;
  installPath: string;
  installDate: string;
  lastPlayed?: string;
  playCount: number;
  isFavorite: boolean;
  customExecutable?: string | null;
  executablePath: string;
}

// Settings type
export interface Settings {
  githubRepo: {
    owner: string;
    repo: string;
    branch: string;
  };
  installPath: string;
  downloadSettings: {
    maxConcurrent: number;
    speedLimit: number | null;
    autoInstall: boolean;
  };
  updateSettings: {
    checkOnStartup: boolean;
    checkInterval: number;
    autoUpdate: boolean;
  };
  appearance: {
    theme: 'light' | 'dark' | 'auto';
    compactMode: boolean;
  };
  notifications: {
    downloadComplete: boolean;
    updateAvailable: boolean;
    installationComplete: boolean;
  };
}

// Download progress type
export interface DownloadProgress {
  downloadId: string;
  appId: string;
  version: string;
  progress: number;
  speed: number;
  eta: number;
  status: 'pending' | 'downloading' | 'paused' | 'completed' | 'error';
  error?: string;
}
