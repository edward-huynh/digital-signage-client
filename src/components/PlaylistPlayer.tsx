import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import ContentPlayer from './ContentPlayer';
import type { PlaylistItem } from '../types';

interface PlaylistPlayerProps {
  items: PlaylistItem[];
}

const PlaylistPlayer: React.FC<PlaylistPlayerProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sortedItems, setSortedItems] = useState<PlaylistItem[]>([]);

  useEffect(() => {
    const sorted = [...items].sort((a, b) => a.order - b.order);
    setSortedItems(sorted);
    setCurrentIndex(0);
  }, [items]);

  const handleItemFinished = useCallback(() => {
    setCurrentIndex((prev) => {
      if (sortedItems.length === 0) return 0;
      return (prev + 1) % sortedItems.length;
    });
  }, [sortedItems.length]);

  if (sortedItems.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder} />
      </View>
    );
  }

  const currentItem = sortedItems[currentIndex];

  return (
    <View style={styles.container}>
      <ContentPlayer item={currentItem} onFinished={handleItemFinished} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  placeholder: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default PlaylistPlayer;
