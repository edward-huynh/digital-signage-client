import { useState, useEffect, useCallback } from 'react';
import * as FileSystem from 'expo-file-system';
import { getPlaylist, getSchedule } from '../api/content';
import { saveContentCache, getContentCache } from '../utils/storage';
import { CONTENT_SYNC_INTERVAL } from '../utils/constants';
import type { Playlist, Schedule, PlaylistItem, ContentCache } from '../types';

interface UseContentSyncReturn {
  playlist: Playlist | null;
  schedules: Schedule[];
  isLoading: boolean;
  error: string | null;
  refreshContent: () => Promise<void>;
}

export const useContentSync = (screenId: string | undefined): UseContentSyncReturn => {
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const downloadContent = useCallback(async (item: PlaylistItem): Promise<ContentCache | null> => {
    try {
      const cacheDir = FileSystem.documentDirectory + 'content/';
      const dirInfo = await FileSystem.getInfoAsync(cacheDir);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(cacheDir, { intermediates: true });
      }

      const fileName = `${item.id}_${item.url.split('/').pop()?.split('?')[0]}`;
      const localPath = cacheDir + fileName;

      const existingFile = await FileSystem.getInfoAsync(localPath);
      if (existingFile.exists) {
        return {
          id: item.id,
          localPath,
          url: item.url,
          downloadedAt: new Date().toISOString(),
        };
      }

      const downloadResult = await FileSystem.downloadAsync(item.url, localPath);
      if (downloadResult.status === 200) {
        return {
          id: item.id,
          localPath,
          url: item.url,
          downloadedAt: new Date().toISOString(),
        };
      }
      return null;
    } catch (err) {
      console.error(`Failed to download content ${item.id}:`, err);
      return null;
    }
  }, []);

  const refreshContent = useCallback(async () => {
    if (!screenId) return;

    setIsLoading(true);
    setError(null);

    try {
      const [fetchedPlaylist, fetchedSchedules] = await Promise.all([
        getPlaylist(screenId),
        getSchedule(screenId),
      ]);

      const existingCache = await getContentCache();
      const cacheMap = new Map(existingCache.map((c) => [c.id, c.localPath]));

      const mergedItems = fetchedPlaylist.items.map((item) => ({
        ...item,
        localPath: cacheMap.get(item.id),
      }));

      setPlaylist({ ...fetchedPlaylist, items: mergedItems });
      setSchedules(fetchedSchedules);

      const cacheForDownload = await getContentCache();
      const cachedIds = new Set(cacheForDownload.map((c) => c.id));

      const newItems = fetchedPlaylist.items.filter((item) => !cachedIds.has(item.id));
      const downloadPromises = newItems.map((item) => downloadContent(item));
      const downloaded = (await Promise.all(downloadPromises)).filter(
        (c): c is ContentCache => c !== null
      );

      if (downloaded.length > 0) {
        const updatedCache = [...cacheForDownload, ...downloaded];
        await saveContentCache(updatedCache);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sync content');
      console.error('Content sync error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [screenId, downloadContent]);

  useEffect(() => {
    if (!screenId) return;

    refreshContent();

    const interval = setInterval(refreshContent, CONTENT_SYNC_INTERVAL);
    return () => clearInterval(interval);
  }, [screenId, refreshContent]);

  return { playlist, schedules, isLoading, error, refreshContent };
};
