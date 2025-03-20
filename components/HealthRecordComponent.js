import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Alert } from 'react-native';

// Dummy health records data for illustration purposes
const initialHealthRecords = [
  { id: '1', date: '2025-03-01', status: 'Healthy', action: 'Regular monitoring' },
  { id: '2', date: '2025-02-15', status: 'Sick', action: 'Consulted veterinarian' },
  { id: '3', date: '2025-01-10', status: 'Warning', action: 'Administered vitamins' },
];

const HealthRecordComponent = () => {
  const [healthRecords, setHealthRecords] = useState(initialHealthRecords);

  // Add new health record (for demonstration purposes, we use a simple alert to show the action)
  const addNewRecord = () => {
    Alert.alert('Add New Health Record', 'This is where you would add a new health record.');
    // You can implement a form or navigation to add a new health record.
  };

  // Handle selecting a record for more details (for now, just an alert)
  const viewRecordDetails = (record) => {
    Alert.alert(
      'Health Record Details',
      `Date: ${record.date}\nStatus: ${record.status}\nAction: ${record.action}`,
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Health Records</Text>

      {/* Display health records in a list */}
      <FlatList
        data={healthRecords}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.recordContainer}>
            <Text style={styles.recordText}>
              {item.date} - {item.status}
            </Text>
            <TouchableOpacity onPress={() => viewRecordDetails(item)}>
              <Text style={styles.detailsButton}>View Details</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Add New Record Button */}
      <Button title="Add New Health Record" onPress={addNewRecord} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  recordContainer: {
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  recordText: {
    fontSize: 16,
    fontWeight: '600',
  },
  detailsButton: {
    color: '#007bff',
    fontSize: 14,
    marginTop: 5,
  },
});

export default HealthRecordComponent;