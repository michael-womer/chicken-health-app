import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'; // Import hooks for Redux
import { setHealthStatus } from '../redux/actions'; // Import action to update health status

// AI Results Component to display the health status and actionable steps
const AIResultsComponent = ({ onConsultVeterinarian }) => {
  // Access health status and actionable steps from Redux store
  const { healthStatus, actionableSteps } = useSelector((state) => state);
  
  // Create dispatch function
  const dispatch = useDispatch();

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

  const healthStatusStyle = getHealthStatusStyle(healthStatus);

  const handleHealthStatusChange = (status) => {
    // Dispatch the action to update the health status in Redux store
    dispatch(setHealthStatus(status));
  };

  return (
    <View style={[styles.container, healthStatusStyle]}>
      <Text style={[styles.statusText, { color: healthStatusStyle.color }]}>
        {healthStatus}
      </Text>
      <Text style={styles.actionText}>{actionableSteps}</Text>

      {healthStatus === 'Sick' && (
        <Button title="Consult Veterinarian" onPress={onConsultVeterinarian} />
      )}

      {/* Buttons to simulate changing health status */}
      <View style={styles.buttonContainer}>
        <Button title="Set Healthy" onPress={() => handleHealthStatusChange('Healthy')} />
        <Button title="Set Sick" onPress={() => handleHealthStatusChange('Sick')} />
        <Button title="Set Warning" onPress={() => handleHealthStatusChange('Warning')} />
      </View>
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
  buttonContainer: {
    marginTop: 20,
  },
});

export default AIResultsComponent;