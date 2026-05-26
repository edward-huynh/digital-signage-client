import apiClient from './client';
import type {
  DeviceRegistrationRequest,
  DeviceRegistrationResponse,
  HeartbeatRequest,
} from '../types';

export const registerDevice = async (
  data: DeviceRegistrationRequest
): Promise<DeviceRegistrationResponse> => {
  const response = await apiClient.post('/devices/register', data);
  return response.data;
};

export const sendHeartbeat = async (
  deviceId: string,
  data: HeartbeatRequest
): Promise<void> => {
  await apiClient.post(`/devices/${deviceId}/heartbeat`, data);
};
