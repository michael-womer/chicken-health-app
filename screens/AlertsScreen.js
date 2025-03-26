import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { acknowledgeAlert, fetchAlerts } from '../redux/actions/healthActions'; // Assuming these actions are set up

const AlertsScreen = () => {
  const dispatch = useDispatch();

  // Fetching active alerts from the Redux store
  const alerts = useSelector((state) => state.alerts);

  // Fetch alerts when the component mounts
  useEffect(() => {
    dispatch(fetchAlerts());  // Fetch active alerts from the server or database
  }, [dispatch]);

  // Handler for acknowledging an alert
  const handleAcknowledge = (alertId) => {
    dispatch(acknowledgeAlert(alertId)); // Dispatch action to mark the alert as acknowledged
    Alert.alert('Alert Acknowledged', 'You have acknowledged this alert.');
  };

  // Function to render each alert item
  const renderAlertItem = ({ item }) => {
    return (
      <View style={styles.alertContainer}>
        <Text style={styles.alertTitle}>{item.title}</Text>
        <Text style={styles.alertMessage}>{item.message}</Text>
        <Text style={styles.alertDate}>Date: {item.date}</Text>

        {/* Buttons for interacting with the alert */}
        <TouchableOpacity style={styles.acknowledgeButton} onPress={() => handleAcknowledge(item.id)}>
          <Text style={styles.buttonText}>Acknowledge Alert</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => Alert.alert('More Info', item.details)}
        >
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Active Alerts</Text>

      {/* Display alerts in a list */}
      <FlatList
        data={alerts}
        renderItem={renderAlertItem}
        keyExtractor={(item) => item.id.toString()}
      />

      {/* Refresh alerts button */}
      <Button title="Refresh Alerts" onPress={() => dispatch(fetchAlerts())} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  alertContainer: {
    width: '100%',
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  alertMessage: {
    fontSize: 16,
    marginBottom: 5,
  },
  alertDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  acknowledgeButton: {
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  detailsButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default AlertsScreen;