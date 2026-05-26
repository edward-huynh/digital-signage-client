import { useState, useEffect } from 'react';
import DeviceInfo from 'react-native-device-info';
import { Dimensions, Platform } from 'react-native';
import { registerDevice } from '../api/device';
import { saveDeviceConfig, getDeviceConfig } from '../utils/storage';
import { APP_VERSION } from '../utils/constants';
import type { DeviceConfig } from '../types';

interface UseDeviceRegistrationReturn {
  deviceConfig: DeviceConfig | null;
  isRegistered: boolean;
  isLoading: boolean;
  error: string | null;
}

export const useDeviceRegistration = (): UseDeviceRegistrationReturn => {
  const [deviceConfig, setDeviceConfig] = useState<DeviceConfig | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const register = async () => {
      try {
        const existingConfig = await getDeviceConfig();
        if (existingConfig) {
          setDeviceConfig(existingConfig);
          setIsRegistered(true);
          setIsLoading(false);
          return;
        }

        const androidId = await DeviceInfo.getUniqueId();
        const { width, height } = Dimensions.get('screen');
        const screenResolution = `${width}x${height}`;

        const response = await registerDevice({
          androidId,
          screenResolution,
          appVersion: APP_VERSION,
        });

        const config: DeviceConfig = {
          deviceId: response.deviceId,
          screenId: response.screenId,
          apiUrl: response.config.apiUrl,
          registeredAt: new Date().toISOString(),
        };

        await saveDeviceConfig(config);
        setDeviceConfig(config);
        setIsRegistered(true);
      } catch (err: any) {
        setError(err.message || 'Failed to register device');
        console.error('Device registration error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    register();
  }, []);

  return { deviceConfig, isRegistered, isLoading, error };
};
