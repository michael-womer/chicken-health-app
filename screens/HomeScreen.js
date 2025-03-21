import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  
  // Sample data (this can be fetched from an API or Redux store)
  const [flockHealthData, setFlockHealthData] = useState({
    totalChickens: 50,
    healthyChickens: 45,
    sickChickens: 5,
  });

  // Function to navigate to the Image Capture screen
  const navigateToImageCapture = () => {
    navigation.navigate('ImageCaptureScreen');
  };

  // Function to navigate to the Health Records screen
  const navigateToHealthRecords = () => {
    navigation.navigate('HistoryScreen');
  };

  // Function to navigate to the Alerts screen
  const navigateToAlerts = () => {
    navigation.navigate('AlertsScreen');
  };

  useEffect(() => {
    // Here, you would typically fetch the flock data from an API or Redux store
    // For demonstration, we'll use static data for now
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flock Health Overview</Text>

      <View style={styles.healthSummary}>
        <Text style={styles.healthText}>
          Total Chickens: {flockHealthData.totalChickens}
        </Text>
        <Text style={[styles.healthText, { color: 'green' }]}>
          Healthy Chickens: {flockHealthData.healthyChickens}
        </Text>
        <Text style={[styles.healthText, { color: 'red' }]}>
          Sick Chickens: {flockHealthData.sickChickens}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={navigateToImageCapture}
        >
          <Text style={styles.buttonText}>Capture Chicken Image</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.button}
          onPress={navigateToHealthRecords}
        >
          <Text style={styles.buttonText}>View Health Records</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.button}
          onPress={navigateToAlerts}
        >
          <Text style={styles.buttonText}>View Alerts</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  healthSummary: {
    marginBottom: 30,
    alignItems: 'center',
  },
  healthText: {
    fontSize: 18,
    marginBottom: 5,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default HomeScreen;