# Firelauncher

A Windows desktop application that serves as a game and application launcher. Firelauncher connects to a GitHub repository to browse, download, install, update, and manage games/applications locally.

## Tech Stack

- **Electron** (v28+) - Desktop application framework
- **React** (v18+) with **TypeScript** - Modern UI framework
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Electron Builder** - Application packaging and distribution

## Development

### Prerequisites

- Node.js 18+ and npm/yarn
- Windows 10/11

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

   In another terminal, start Electron:
   ```bash
   npm run electron:dev
   ```

   Or use the combined command:
   ```bash
   npm run electron:dev
   ```

### Building

Build for production:
```bash
npm run build
```

Build Electron app:
```bash
npm run build:electron
```

Create distributable:
```bash
npm run dist
```

## Repository Structure

The application expects a GitHub repository with the following structure:

```
repository/
├── games/
│   └── [game-id]/
│       ├── metadata.json
│       └── VerX.Y/
│           ├── metadata.json
│           └── [release files]
└── applications/
    └── [app-id]/
        ├── metadata.json
        └── VerX.Y/
            ├── metadata.json
            └── [release files]
```

See `PLAN.md` for detailed architecture and implementation details.

## License

MIT
