import apiClient from './client';
import type { Playlist, Schedule } from '../types';

export const getPlaylist = async (screenId: string): Promise<Playlist> => {
  const response = await apiClient.get(`/screens/${screenId}/playlist`);
  return response.data;
};

export const getSchedule = async (screenId: string): Promise<Schedule[]> => {
  const response = await apiClient.get(`/screens/${screenId}/schedule`);
  return response.data;
};
