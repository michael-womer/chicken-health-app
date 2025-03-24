import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

// AI Results Component to display the health status and actionable steps
const AIResultsComponent = ({ healthStatus, onConsultVeterinarian }) => {
  // Define styles for each health status
  const getHealthStatusStyle = (status) => {
    switch (status) {
      case 'Healthy':
        return { backgroundColor: '#28a745', color: 'white' }; // Green for healthy
      case 'Sick':
        return { backgroundColor: '#dc3545', color: 'white' }; // Red for sick
      case 'Warning':
        return { backgroundColor: '#ffc107', color: 'black' }; // Yellow for warning
      default:
        return { backgroundColor: '#6c757d', color: 'white' }; // Default gray
    }
  };

  // Actionable steps based on health status
  const getActionableSteps = (status) => {
    switch (status) {
      case 'Healthy':
        return 'Keep monitoring your chicken regularly.';
      case 'Sick':
        return 'Consult a veterinarian immediately.';
      case 'Warning':
        return 'Check for symptoms and provide care.';
      default:
        return 'No data available.';
    }
  };

  const healthStatusStyle = getHealthStatusStyle(healthStatus);
  const actionableSteps = getActionableSteps(healthStatus);

  return (
    <View style={[styles.container, healthStatusStyle]}>
     
      <Text style={[styles.statusText, { color: healthStatusStyle.color }]}>
        {healthStatus}
      </Text>
      <Text style={styles.actionText}>{actionableSteps}</Text>

      {healthStatus === 'Sick' && (
        <Button title="Consult Veterinarian" onPress={onConsultVeterinarian} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    margin: 10,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  statusText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  actionText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default AIResultsComponent;