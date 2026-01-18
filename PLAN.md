# Firelauncher - Game Launcher Application Plan

## Overview
Firelauncher is a Windows desktop application that serves as a game and application launcher. It connects to a GitHub repository that hosts application metadata and versioned releases, allowing users to browse, download, install, update, and manage games/applications locally.

## Tech Stack

### Core Technology
- **Electron** (v28+) - Desktop application framework
- **React** (v18+) with **TypeScript** - Modern UI framework
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Electron Builder** - Application packaging and distribution

### Key Libraries
- **Axios** - HTTP client for GitHub API
- **adm-zip** - ZIP extraction
- **node-fetch** - Alternative HTTP client (if needed)
- **electron-store** - Local data persistence
- **react-router-dom** - Client-side routing
- **zustand** or **recoil** - State management
- **lucide-react** - Icon library
- **framer-motion** - Animations (optional)

## Architecture

### Project Structure
```
Firelauncher/
├── src/
│   ├── main/                  # Electron main process
│   │   ├── main.ts            # Main entry point
│   │   ├── ipc-handlers/      # IPC message handlers
│   │   ├── download-manager/  # Download queue and management
│   │   ├── file-manager/      # File operations (extract, delete)
│   │   └── app-manager/       # Installed apps management
│   ├── renderer/              # React frontend
│   │   ├── components/        # React components
│   │   │   ├── AppCard.tsx
│   │   │   ├── AppDetail.tsx
│   │   │   ├── DownloadManager.tsx
│   │   │   └── ...
│   │   ├── pages/             # Page components
│   │   │   ├── HomePage.tsx
│   │   │   ├── AppDetailPage.tsx
│   │   │   ├── MyAppsPage.tsx
│   │   │   └── SettingsPage.tsx
│   │   ├── hooks/             # Custom React hooks
│   │   ├── services/          # API and business logic
│   │   ├── store/             # State management
│   │   ├── types/             # TypeScript definitions
│   │   └── App.tsx            # Root component
│   └── shared/                # Shared types/utilities
│       └── types.ts
├── public/                    # Static assets
├── Applications/              # Local installed applications (gitignored)
│   └── [app-id]/
│       └── [VerX.Y]/          # Version folder (e.g., Ver0.1, Ver1.0)
│           └── [extracted files]
├── dist/                      # Build output
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

## Data Models

### GitHub Repository Structure
```
repository/
├── games/
│   ├── game-1/
│   │   ├── metadata.json
│   │   ├── Ver0.1/              # Version folders use VerX.Y format
│   │   │   ├── metadata.json
│   │   │   └── [release files]
│   │   └── Ver1.0/
│   │       ├── metadata.json
│   │       └── [release files]
│   └── game-2/
│       └── ...
└── applications/
    └── app-1/
        ├── metadata.json
        └── VerX.Y/              # Version folders (e.g., Ver0.1)
            ├── metadata.json
            └── [release files]
```

### Metadata.json (Application Root)
```json
{
  "id": "unique-app-id",
  "title": "Application Name",
  "description": "Full description",
  "author": "Author Name",
  "category": "game" | "application",
  "tags": ["tag1", "tag2"],
  "images": {
    "icon": "icon.png",
    "banner": "banner.png",
    "screenshots": ["screenshot1.png", "screenshot2.png"]
  },
  "versions": {
    "0.1": {
      "folder": "Ver0.1",
      "releaseDate": "2024-01-01",
      "changelog": "Initial release"
    },
    "1.0": {
      "folder": "Ver1.0",
      "releaseDate": "2024-02-01",
      "changelog": "Bug fixes and improvements"
    }
  },
  "repository": {
    "owner": "github-username",
    "repo": "repository-name"
  }
}
```

### Version Metadata.json (Version Folder)
```json
{
  "version": "0.1",              # Version string (e.g., "0.1", "1.0")
  "executable": "path/to/executable.exe",
  "executableArgs": ["--option", "value"],  // Optional
  "workingDirectory": "path/to/working/dir", // Optional
  "releaseDate": "2024-01-01",
  "changelog": "Version changelog",
  "downloadUrl": "https://github.com/owner/repo/releases/download/v1.0.0/app.zip",
  "fileSize": 52428800,  // bytes
  "checksum": "sha256-hash",  // Optional for verification
  "dependencies": {  // Optional
    "runtime": "required-runtime.exe",
    "directX": "11"
  },
  "minimumOsVersion": "Windows 10",  // Optional
  "requirements": {  // Optional
    "ram": "8GB",
    "disk": "2GB"
  }
}
```

### Installed Application (Local Storage)
```json
{
  "id": "unique-app-id",
  "installedVersion": "1.0.0",
  "installPath": "C:/Users/.../Applications/app-id/Ver0.1",
  "installDate": "2024-01-15",
  "lastPlayed": "2024-01-20",
  "playCount": 5,
  "isFavorite": false,
  "customExecutable": null,  // Optional user override
  "executablePath": "path/to/app.exe"
}
```

## Core Features

### 1. Application Discovery
- **Fetch from GitHub**: Scan repository for games/ and applications/ folders
- **Cache Management**: Store metadata locally, update periodically
- **Search & Filter**: Search by name, filter by category/tags
- **Browse Views**: Grid/list view toggle, category browsing

### 2. Application Details
- **Info Display**: Title, description, author, screenshots, banner
- **Version Selection**: Dropdown/list of available versions
- **Version Info**: Changelog, release date, file size per version
- **Requirements**: Display system requirements if available

### 3. Download Management
- **Queue System**: Multiple downloads with priority queue
- **Progress Tracking**: Real-time download progress per app/version
- **Pause/Resume**: Ability to pause and resume downloads
- **Retry Logic**: Automatic retry on failure
- **Bandwidth Control**: Optional download speed limits

### 4. Installation
- **Extract ZIP**: Automatic extraction to applications folder
- **Verify**: Optional checksum verification
- **Version Management**: Keep multiple versions or replace
- **Cleanup**: Remove incomplete downloads on failure

### 5. Application Management
- **Play Button**: Launch installed applications
- **Uninstall**: Remove application and all files
- **Update**: Check for updates, download and install
- **Update Notifications**: Notify when updates are available
- **Install History**: Track installation/uninstallation events

### 6. Local State Management
- **Installed Apps Registry**: Track all installed applications
- **Settings**: GitHub repo URL, install path, auto-update settings
- **Cache**: Store application metadata for offline browsing
- **User Preferences**: Theme, notifications, download settings

## User Interface

### Main Views

#### 1. Home/Browse Page
- Search bar at top
- Category filters (Games, Applications, All)
- Grid of application cards showing:
  - Icon/banner
  - Title
  - Installed badge (if installed)
  - Update available badge
  - Download/Update/Play button

#### 2. Application Detail Page
- Large banner image
- Title, author, description
- Screenshot gallery
- Version selector dropdown
- Version info (changelog, size, date)
- Action buttons:
  - **Download** (if not installed)
  - **Play** (if installed)
  - **Update** (if update available)
  - **Uninstall** (if installed)
  - **Reinstall** (if installed)
- Requirements section
- Tags

#### 3. My Apps Page
- List/grid of installed applications
- Sort by: Name, Last Played, Install Date
- Filter by: Recently Played, Favorites
- Quick actions: Play, Update, Uninstall
- Play count, last played date

#### 4. Downloads Page
- Active downloads list
- Progress bars with speed/ETA
- Pause/Resume/Cancel buttons
- Download history
- Completed downloads with install prompt

#### 5. Settings Page
- GitHub Repository URL (configurable)
- Installation Path (default: applications/ in app data)
- Auto-update settings
- Theme selection (Light/Dark)
- Notification preferences
- Download settings (concurrent downloads, speed limit)
- Clear cache option
- About section

### UI Design Principles
- **Modern & Clean**: Material Design or Fluent Design inspired
- **Dark Theme Default**: Gaming-focused aesthetic
- **Responsive**: Adapt to window resizing
- **Animations**: Smooth transitions, loading states
- **Accessibility**: Keyboard navigation, screen reader support

## Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
1. **Project Setup**
   - Initialize Electron + React + TypeScript project
   - Configure Vite build system
   - Set up TailwindCSS
   - Create project structure
   - Configure Electron Builder

2. **Basic Electron Setup**
   - Main process entry point
   - Renderer process with React
   - IPC communication setup
   - Window management
   - Auto-updater framework (optional)

3. **GitHub Integration**
   - GitHub API client service
   - Repository scanning logic
   - Metadata.json parser
   - Error handling and retries

### Phase 2: Core Features (Week 3-4)
4. **Data Models & Types**
   - TypeScript interfaces for all data models
   - Validation utilities
   - Shared type definitions

5. **State Management**
   - Zustand/Recoil stores for:
     - Applications list
     - Installed apps
     - Downloads queue
     - Settings
   - IPC handlers for main/renderer communication

6. **Basic UI**
   - Routing setup (React Router)
   - Layout component (sidebar/navbar)
   - Application card component
   - Basic browse page

### Phase 3: Download & Install (Week 5-6)
7. **Download Manager**
   - Download queue implementation
   - Progress tracking (IPC events)
   - Pause/resume functionality
   - Error handling
   - ZIP verification

8. **Installation System**
   - ZIP extraction to applications folder
   - Version folder management
   - Executable path resolution
   - Installation registry updates

9. **File Management**
   - Application launch (executable with args)
   - Uninstallation (recursive folder deletion)
   - Update detection and installation
   - Working directory management

### Phase 4: UI Polish (Week 7-8)
10. **Application Detail Page**
    - Full detail view with all metadata
    - Version selector
    - Screenshot gallery
    - Action buttons

11. **My Apps Page**
    - Installed apps list
    - Sort/filter functionality
    - Quick actions

12. **Downloads Page**
    - Download queue UI
    - Progress indicators
    - History

13. **Settings Page**
    - All settings options
    - Path configuration
    - Theme toggle

### Phase 5: Advanced Features (Week 9-10)
14. **Update System**
    - Automatic update checking
    - Update notifications
    - Incremental updates (if possible)

15. **Search & Filter**
    - Search functionality
    - Category filters
    - Tag filters
    - Sort options

16. **Caching & Performance**
    - Metadata caching
    - Image caching
    - Lazy loading
    - Virtual scrolling for large lists

### Phase 6: Polish & Testing (Week 11-12)
17. **Error Handling**
    - Comprehensive error messages
    - Network error handling
    - File system error handling
    - User-friendly error dialogs

18. **Testing**
    - Unit tests for utilities
    - Integration tests for IPC
    - Manual testing checklist
    - Edge case testing

19. **Documentation**
    - Code documentation
    - User guide
    - Developer setup guide

20. **Packaging & Distribution**
    - Electron Builder configuration
    - Windows installer (NSIS/Inno Setup)
    - Auto-updater setup (optional)
    - Code signing (optional)

## Technical Considerations

### Security
- **Sanitize file paths**: Prevent directory traversal attacks
- **Validate metadata**: Ensure JSON schema validation
- **Checksum verification**: Optional but recommended for downloads
- **Safe execution**: Validate executables before running
- **Auto-updater**: Use signed updates only

### Performance
- **Lazy loading**: Load app metadata on demand
- **Image optimization**: Compress/cache images
- **Virtual scrolling**: For large application lists
- **Background processing**: Downloads in main process
- **Debouncing**: Search and filter inputs

### Error Handling
- **Network errors**: Retry logic with exponential backoff
- **File system errors**: Check permissions, disk space
- **Corrupted downloads**: Re-download on verification failure
- **Missing metadata**: Graceful degradation
- **GitHub API limits**: Rate limiting and caching

### User Experience
- **Loading states**: Skeletons, spinners, progress bars
- **Empty states**: Helpful messages when no apps/downloads
- **Notifications**: Toast notifications for events
- **Keyboard shortcuts**: Common actions (Ctrl+F for search, etc.)
- **Offline mode**: Show cached data when offline

## Configuration

### Settings Schema
```typescript
interface Settings {
  githubRepo: {
    owner: string;
    repo: string;
    branch: string; // default: "main"
  };
  installPath: string; // default: %APPDATA%/Firelauncher/Applications
  downloadSettings: {
    maxConcurrent: number; // default: 3
    speedLimit: number | null; // bytes/sec, null = unlimited
    autoInstall: boolean; // auto-install after download
  };
  updateSettings: {
    checkOnStartup: boolean;
    checkInterval: number; // hours
    autoUpdate: boolean; // auto-update installed apps
  };
  appearance: {
    theme: "light" | "dark" | "auto";
    compactMode: boolean;
  };
  notifications: {
    downloadComplete: boolean;
    updateAvailable: boolean;
    installationComplete: boolean;
  };
}
```

## API/Service Layer

### Services Needed

1. **GitHubService**
   - `scanRepository()` - Get all apps/games
   - `getAppMetadata(appId)` - Get app root metadata
   - `getVersionMetadata(appId, version)` - Get version metadata
   - `downloadVersion(appId, version)` - Download ZIP
   - `getDownloadUrl(appId, version)` - Get direct download URL

2. **DownloadService** (Main Process)
   - `queueDownload(url, destination)`
   - `pauseDownload(downloadId)`
   - `resumeDownload(downloadId)`
   - `cancelDownload(downloadId)`
   - `getProgress(downloadId)`

3. **InstallService** (Main Process)
   - `installApp(appId, version, zipPath)`
   - `uninstallApp(appId)`
   - `updateApp(appId, newVersion)`
   - `launchApp(appId)`
   - `getInstalledApps()`

4. **StorageService**
   - `saveInstalledApp(app)`
   - `removeInstalledApp(appId)`
   - `getInstalledApp(appId)`
   - `getAllInstalledApps()`
   - `saveSettings(settings)`
   - `getSettings()`
   - `cacheMetadata(appId, metadata)`
   - `getCachedMetadata(appId)`

## Future Enhancements (Post-MVP)

1. **User Accounts**: Sync settings/installed apps across devices
2. **Reviews & Ratings**: Community ratings and reviews
3. **Screenshots & Videos**: Preview before download
4. **Mod Support**: Manage mods for games
5. **Achievements**: Track game achievements
6. **Social Features**: Share, friends, activity feed
7. **Cloud Saves**: Sync save files
8. **Multiple Repositories**: Support multiple GitHub repos
9. **Offline Mode**: Full offline functionality
10. **Linux/Mac Support**: Cross-platform support

## Dependencies (package.json example)

```json
{
  "dependencies": {
    "electron": "^28.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "axios": "^1.6.0",
    "adm-zip": "^0.5.10",
    "electron-store": "^8.1.0",
    "zustand": "^4.4.0",
    "lucide-react": "^0.294.0",
    "framer-motion": "^10.16.0"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "electron-builder": "^24.9.0",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32"
  }
}
```

## Development Environment Setup

1. **Prerequisites**
   - Node.js 18+ and npm/yarn
   - Git
   - Windows 10/11
   - Visual Studio Code (recommended)

2. **Setup Steps**
   ```bash
   npm install
   npm run dev          # Start dev server
   npm run build        # Build for production
   npm run dist         # Create distributable
   ```

3. **Development Workflow**
   - Hot reload for renderer process
   - Auto-reload for main process changes
   - DevTools available
   - Source maps enabled

## Testing Strategy

1. **Unit Tests**: Jest for utility functions
2. **Integration Tests**: Test IPC communication
3. **E2E Tests**: Playwright/Spectron for full app testing
4. **Manual Testing**: Comprehensive test checklist

---

## Summary

This plan provides a complete roadmap for building Firelauncher as a professional Windows desktop application using Electron, React, and TypeScript. The architecture is modular, scalable, and maintainable, with clear separation between the main process (system operations) and renderer process (UI).

The phased approach allows for iterative development, with each phase delivering working functionality. The tech stack chosen provides excellent developer experience, modern UI capabilities, and strong Windows integration through Electron.
