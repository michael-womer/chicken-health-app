import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, Button, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import { logOut } from '../redux/actions/authActions'; // Action for logout

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // Assuming you store user info in Redux

  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // Get the current notification permission status on component mount
  useEffect(() => {
    const checkNotificationPermission = async () => {
      const authStatus = await messaging().hasPermission();
      setNotificationsEnabled(authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL);
    };

    checkNotificationPermission();
  }, []);

  // Toggle notifications on/off
  const handleNotificationToggle = async () => {
    if (notificationsEnabled) {
      await messaging().requestPermission(); // Request permission to receive notifications
    } else {
      await messaging().deleteToken(); // Remove notification token
    }
    setNotificationsEnabled(!notificationsEnabled); // Toggle state
  };

  // Handle logout functionality
  const handleLogout = () => {
    dispatch(logOut()); // Dispatch the logOut action
    Alert.alert('Logged Out', 'You have successfully logged out.');
    navigation.replace('Login'); // Navigate to login screen after logout
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      {/* Notification Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notification Preferences</Text>
        <View style={styles.preferenceContainer}>
          <Text style={styles.preferenceText}>Enable Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={handleNotificationToggle}
          />
        </View>
      </View>

      {/* Account Settings */}
      {user && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <Text style={styles.preferenceText}>Logged in as: {user.email}</Text>
          <Button title="Logout" onPress={handleLogout} color="#ff6347" />
        </View>
      )}

      {/* Additional Settings */}
      {!user && (
        <View style={styles.section}>
          <Button title="Login" onPress={() => navigation.navigate('Login')} />
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    width: '100%',
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  preferenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  preferenceText: {
    fontSize: 16,
  },
});

export default SettingsScreen;