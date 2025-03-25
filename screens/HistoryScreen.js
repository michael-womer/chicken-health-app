import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addHealthReport, updateHealthReport } from '../redux/actions/healthActions'; // Assuming you have these actions set up

const HistoryScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Get the health reports from Redux store
  const healthReports = useSelector((state) => state.healthReports);

  const [isEditing, setIsEditing] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  // Handler for adding a new record
  const handleAddRecord = () => {
    navigation.navigate('ImageCaptureScreen');  // Navigate to capture image screen to start a new record
  };

  // Handler for editing an existing record
  const handleEditRecord = (record) => {
    setCurrentRecord(record);
    setIsEditing(true);
    navigation.navigate('ImageCaptureScreen', { record }); // Pass the record for editing
  };

  // Function to update the health report
  const handleUpdateReport = (updatedRecord) => {
    dispatch(updateHealthReport(updatedRecord)); // Dispatch update action
    setIsEditing(false);
    Alert.alert('Success', 'Health record updated.');
  };

  // Function to render each record
  const renderItem = ({ item }) => {
    return (
      <View style={styles.recordContainer}>
        <Text style={styles.recordText}>Date: {item.date}</Text>
        <Text style={styles.recordText}>Status: {item.status}</Text>
        <TouchableOpacity style={styles.editButton} onPress={() => handleEditRecord(item)}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Health History</Text>

      {/* Show health history in a list */}
      <FlatList
        data={healthReports}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

      {/* Add new record button */}
      <Button title="Add New Record" onPress={handleAddRecord} />

      {/* Display form for editing (when isEditing is true) */}
      {isEditing && currentRecord && (
        <View style={styles.editForm}>
          <Text style={styles.editTitle}>Edit Health Record</Text>
          <Text>Status: {currentRecord.status}</Text>
          {/* Here you could allow the user to edit the status and other details */}
          <Button
            title="Save Changes"
            onPress={() => handleUpdateReport({ ...currentRecord, status: 'Updated Status' })}
          />
          <Button title="Cancel" onPress={() => setIsEditing(false)} />
        </View>
      )}
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
  recordContainer: {
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
  recordText: {
    fontSize: 16,
    marginBottom: 5,
  },
  editButton: {
    marginTop: 10,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  editForm: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '100%',
  },
  editTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default HistoryScreen;