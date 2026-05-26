import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ErrorScreenProps {
  message?: string;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ message = 'Something went wrong' }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>⚠️</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  icon: {
    fontSize: 48,
    marginBottom: 16,
  },
  message: {
    color: '#ff4444',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default ErrorScreen;
