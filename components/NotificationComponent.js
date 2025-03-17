import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Button } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';

const NotificationComponent = () => {
  const [notification, setNotification] = useState(null);
  const navigation = useNavigation();

  // Request permission to receive push notifications (iOS only)
  useEffect(() => {
    const requestPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Notification permission granted');
      } else {
        console.log('Notification permission denied');
      }
    };

    requestPermission();

    // Get the token to send push notifications to the device
    messaging()
      .getToken()
      .then(token => {
        console.log('FCM Token:', token); // This token can be used to send push notifications to this device
      });

    // Foreground notification listener
    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      console.log('Foreground message received:', remoteMessage);
      setNotification(remoteMessage.notification); // Update notification state when new message arrives
    });

    // Background notification listener
    const unsubscribeOnNotificationOpenedApp = messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification caused app to open from background:', remoteMessage);
      setNotification(remoteMessage.notification);
    });

    // Check whether app was opened from a notification
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('App opened from a notification:', remoteMessage);
          setNotification(remoteMessage.notification);
        }
      });

    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpenedApp();
    };
  }, []);

  // Navigate to another screen when the notification is tapped
  const handleNotificationTap = () => {
    if (notification) {
      navigation.navigate('AlertsScreen'); // Navigate to the Alerts screen (or whichever screen you want)
    }
  };

  return (
    <View style={styles.container}>
      {notification ? (
        <>
          <Text style={styles.title}>New Alert!</Text>
          <Text style={styles.message}>{notification.body}</Text>
          <Button title="View Alerts" onPress={handleNotificationTap} />
        </>
      ) : (
        <Text>No new alerts</Text>
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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff6347',
    marginBottom: 10,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default NotificationComponent;