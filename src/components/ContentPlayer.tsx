import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import type { PlaylistItem } from '../types';

interface ContentPlayerProps {
  item: PlaylistItem;
  onFinished: () => void;
}

const ContentPlayer: React.FC<ContentPlayerProps> = ({ item, onFinished }) => {
  const videoRef = useRef<any>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    setIsVideoReady(false);
  }, [item]);

  if (item.type === 'video') {
    return (
      <View style={styles.container}>
        <Video
          ref={videoRef}
          source={{ uri: item.localPath || item.url }}
          style={styles.media}
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay
          isLooping={false}
          isMuted={false}
          onPlaybackStatusUpdate={(status: any) => {
            if (status.isLoaded) {
              if (!isVideoReady && status.isReadyForDisplay) {
                setIsVideoReady(true);
              }
              if (status.didJustFinish) {
                onFinished();
              }
            }
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: item.localPath || item.url }}
        style={styles.media}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  media: {
    flex: 1,
  },
});

export default ContentPlayer;
