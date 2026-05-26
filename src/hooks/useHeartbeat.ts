import { useEffect, useRef, useCallback } from 'react';
import { Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { sendHeartbeat } from '../api/device';
import { HEARTBEAT_INTERVAL, APP_VERSION } from '../utils/constants';

interface UseHeartbeatProps {
  deviceId: string;
  currentContentId?: string;
}

export const useHeartbeat = ({ deviceId, currentContentId }: UseHeartbeatProps) => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const sendBeat = useCallback(async () => {
    try {
      const { width, height } = Dimensions.get('screen');
      await sendHeartbeat(deviceId, {
        status: 'online',
        screenResolution: `${width}x${height}`,
        appVersion: APP_VERSION,
        currentContentId,
      });
    } catch (err) {
      console.error('Heartbeat failed:', err);
    }
  }, [deviceId, currentContentId]);

  useEffect(() => {
    if (!deviceId) return;

    sendBeat();

    intervalRef.current = setInterval(sendBeat, HEARTBEAT_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [deviceId, sendBeat]);

  return;
};
