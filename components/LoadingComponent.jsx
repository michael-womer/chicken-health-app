import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

// Loading component to show while data is being fetched or AI analysis is in progress
const LoadingComponent = ({ message = "Please wait, processing..." }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#008CBA" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Semi-transparent background to show loading on top of other content
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  message: {
    marginTop: 20,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
});

export default LoadingComponent;