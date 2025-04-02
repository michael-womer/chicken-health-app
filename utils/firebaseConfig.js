import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

// Request permission for notifications (iOS only)
export const requestUserPermission = async () => {
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

// Get FCM token for the device
export const getFCMToken = async () => {
  const token = await messaging().getToken();
  console.log('FCM Token:', token);
  return token;
};

// Handle background notifications
export const handleBackgroundMessage = messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});