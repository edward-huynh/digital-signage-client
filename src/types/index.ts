export interface DeviceConfig {
  deviceId: string;
  screenId: string;
  apiUrl: string;
  registeredAt: string;
}

export interface DeviceRegistrationRequest {
  androidId: string;
  screenResolution: string;
  appVersion: string;
}

export interface DeviceRegistrationResponse {
  deviceId: string;
  screenId: string;
  config: DeviceConfig;
}

export interface HeartbeatRequest {
  status: 'online' | 'offline' | 'error';
  screenResolution: string;
  appVersion: string;
  currentContentId?: string;
}

export interface PlaylistItem {
  id: string;
  type: 'video' | 'image';
  url: string;
  duration: number;
  order: number;
  localPath?: string;
}

export interface Playlist {
  id: string;
  screenId: string;
  items: PlaylistItem[];
  updatedAt: string;
}

export interface Schedule {
  id: string;
  screenId: string;
  playlistId: string;
  startDate: string;
  endDate: string;
  startTime?: string;
  endTime?: string;
  daysOfWeek: number[];
}

export interface ContentCache {
  id: string;
  localPath: string;
  url: string;
  downloadedAt: string;
  expiresAt?: string;
}
