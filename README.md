# Digital Signage Player - React Native Android App

A React Native Android application for digital signage displays. The app automatically registers devices, downloads and caches content, and plays video/image playlists in kiosk mode.

## Features

- **Device Registration**: Automatically registers with backend using Android device ID
- **Content Playback**: Supports video and image playback with smooth transitions
- **Playlist Management**: Loops through playlist items continuously
- **Schedule Sync**: Fetches and respects scheduled content
- **Offline Caching**: Downloads and caches content for offline playback
- **Heartbeat**: Sends periodic status updates to backend (every 30 seconds)
- **Kiosk Mode**: Prevents user interaction, locks to landscape orientation

## Tech Stack

- **Framework**: React Native (Expo)
- **Platform**: Android
- **Device Identification**: `react-native-device-info`
- **Video Playback**: `expo-av`
- **File System**: `expo-file-system`
- **Local Storage**: `@react-native-async-storage/async-storage`
- **HTTP Client**: `axios`

## Project Structure

```
src/
  api/          # API client and endpoint definitions
  components/   # React components (ContentPlayer, PlaylistPlayer, etc.)
  hooks/        # Custom React hooks (device registration, heartbeat, content sync)
  types/        # TypeScript type definitions
  utils/        # Utility functions (storage, constants, kiosk mode)
```

## API Endpoints

The app expects the following backend API endpoints:

- `POST /api/v1/devices/register` - Register/update device
- `POST /api/v1/devices/:deviceId/heartbeat` - Device heartbeat
- `GET /api/v1/screens/:id/playlist` - Get current playlist
- `GET /api/v1/screens/:id/schedule` - Get current schedule

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure the API base URL in `src/utils/constants.ts`

3. Run the app:
   ```bash
   npm run android
   ```

## Configuration

Update `src/utils/constants.ts` to configure:
- `API_BASE_URL`: Backend API URL
- `HEARTBEAT_INTERVAL`: Heartbeat frequency (default: 30 seconds)
- `CONTENT_SYNC_INTERVAL`: Content sync frequency (default: 60 seconds)

## Acceptance Criteria

- [x] App registers device on first launch
- [x] Device ID persists across app restarts
- [x] Content downloads and caches locally
- [x] Playlist loops continuously
- [x] Heartbeat sends every 30 seconds
- [x] Handles network disconnection gracefully
- [x] Works in kiosk mode (no user interaction)
