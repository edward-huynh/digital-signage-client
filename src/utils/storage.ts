import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../utils/constants';
import type { DeviceConfig, ContentCache } from '../types';

export const saveDeviceConfig = async (config: DeviceConfig): Promise<void> => {
  await AsyncStorage.setItem(STORAGE_KEYS.DEVICE_CONFIG, JSON.stringify(config));
};

export const getDeviceConfig = async (): Promise<DeviceConfig | null> => {
  const data = await AsyncStorage.getItem(STORAGE_KEYS.DEVICE_CONFIG);
  return data ? JSON.parse(data) : null;
};

export const clearDeviceConfig = async (): Promise<void> => {
  await AsyncStorage.removeItem(STORAGE_KEYS.DEVICE_CONFIG);
};

export const saveContentCache = async (cache: ContentCache[]): Promise<void> => {
  await AsyncStorage.setItem(STORAGE_KEYS.CONTENT_CACHE, JSON.stringify(cache));
};

export const getContentCache = async (): Promise<ContentCache[]> => {
  const data = await AsyncStorage.getItem(STORAGE_KEYS.CONTENT_CACHE);
  return data ? JSON.parse(data) : [];
};

export const saveLastSync = async (timestamp: string): Promise<void> => {
  await AsyncStorage.setItem(STORAGE_KEYS.LAST_SYNC, timestamp);
};

export const getLastSync = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(STORAGE_KEYS.LAST_SYNC);
};
