import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { useDeviceRegistration } from './src/hooks/useDeviceRegistration';
import { useContentSync } from './src/hooks/useContentSync';
import { useHeartbeat } from './src/hooks/useHeartbeat';
import { useKioskMode } from './src/utils/useKioskMode';
import LoadingScreen from './src/components/LoadingScreen';
import ErrorScreen from './src/components/ErrorScreen';
import PlaylistPlayer from './src/components/PlaylistPlayer';

export default function App() {
  useKioskMode();

  const { deviceConfig, isRegistered, isLoading, error } = useDeviceRegistration();

  useHeartbeat({
    deviceId: deviceConfig?.deviceId || '',
  });

  const { playlist, isLoading: isContentLoading, error: contentError } = useContentSync(
    isRegistered ? deviceConfig?.screenId : undefined
  );

  if (isLoading || isContentLoading) {
    return <LoadingScreen message="Initializing..." />;
  }

  if (error) {
    return <ErrorScreen message={error} />;
  }

  if (contentError) {
    return <ErrorScreen message={contentError} />;
  }

  if (!playlist || playlist.items.length === 0) {
    return <LoadingScreen message="No content available" />;
  }

  return (
    <React.Fragment>
      <StatusBar hidden />
      <PlaylistPlayer items={playlist.items} />
    </React.Fragment>
  );
}
