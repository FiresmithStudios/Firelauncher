import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { GitHubService } from './services/github-service';

// Keep a global reference of the window object
let mainWindow: BrowserWindow | null = null;

// Initialize GitHub service
const githubService = new GitHubService('FiresmithStudios', 'Firelauncher', 'main');

const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

function createWindow(): void {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    titleBarStyle: 'default',
  });

  // Load the app
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC handlers
ipcMain.handle('github:scan-repository', async () => {
  try {
    const apps = await githubService.scanRepository();
    return { success: true, data: apps };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('github:get-app-metadata', async (_event, category: string, appId: string) => {
  try {
    const metadata = await githubService.getAppMetadata(category, appId);
    return { success: true, data: metadata };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('github:get-version-metadata', async (_event, category: string, appId: string, versionFolder: string) => {
  try {
    const metadata = await githubService.getVersionMetadata(category, appId, versionFolder);
    return { success: true, data: metadata };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});
