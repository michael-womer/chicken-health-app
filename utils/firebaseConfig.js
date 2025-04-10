// firebaseConfig.js

import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import { Storage } from '@react-native-firebase/storage';  // For Firebase Storage if you're storing images
import axios from 'axios';

/**
 * Upload image to Firebase Storage (optional, if you need to store the image first).
 * @param {string} imageUri - The URI of the image to upload.
 * @returns {Promise<string>} - The public URL of the uploaded image.
 */
export const uploadImageToStorage = async (imageUri) => {
  try {
    const reference = Storage().ref('chicken_images/' + new Date().toISOString() + '.jpg');
    await reference.putFile(imageUri);  // Upload the image file
    const url = await reference.getDownloadURL();  // Get the download URL
    return url;
  } catch (error) {
    console.error('Error uploading image to Firebase Storage:', error);
    throw new Error('Image upload failed');
  }
};

/**
 * Function to send the image to Google Cloud Vision API for analysis.
 * @param {string} imageUri - The URI of the captured image.
 * @returns {Promise<Object>} - The result from Google Cloud Vision.
 */
export const analyzeImageWithGoogleVision = async (imageUri) => {
  try {
    // Upload the image first (if using Firebase Storage or local storage)
    const imageUrl = await uploadImageToStorage(imageUri);

    // Call Google Vision API to analyze the image
    const response = await axios.post(
      'https://vision.googleapis.com/v1/images:annotate?key=YOUR_GOOGLE_CLOUD_API_KEY',
      {
        requests: [
          {
            image: {
              source: {
                imageUri: imageUrl,  // You can also directly upload the image as base64 if needed
              },
            },
            features: [
              {
                type: 'LABEL_DETECTION',
                maxResults: 10,
              },
            ],
          },
        ],
      }
    );

    return response.data.responses[0];
  } catch (error) {
    console.error('Error during image analysis with Google Vision:', error);
    throw new Error('Image analysis failed');
  }
};

/**
 * Request notification permissions for iOS and Android.
 */
export const requestNotificationPermission = async () => {
  if (Platform.OS === 'ios') {
    // Request permission on iOS (required for push notifications)
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    return enabled;
  }
  // For Android, permissions are handled automatically, so just return true
  return true;
};

/**
 * Fetch the FCM token, used to send push notifications to the device.
 * 
 * @returns {Promise<string>} - The FCM token.
 */
export const getFcmToken = async () => {
  try {
    const token = await messaging().getToken();
    if (token) {
      console.log('FCM Token:', token);  // This token can be used to send notifications
      return token;
    }
    throw new Error('Failed to get FCM token');
  } catch (error) {
    console.error('Error fetching FCM token:', error);
    throw error;
  }
};

/**
 * Set up background and foreground message listeners for push notifications.
 * 
 * @param {function} onMessageReceived - A callback function to handle messages received.
 */
export const setupPushNotificationListeners = (onMessageReceived) => {
  // Foreground message listener
  const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
    console.log('Foreground message received:', remoteMessage);
    onMessageReceived(remoteMessage);  // Call your callback with the received message
  });

  // Background message listener
  const unsubscribeOnNotificationOpenedApp = messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('Notification opened from background:', remoteMessage);
    onMessageReceived(remoteMessage);  // Call your callback with the received message
  });

  // App launched from a notification
  messaging().getInitialNotification().then(remoteMessage => {
    if (remoteMessage) {
      console.log('App launched from notification:', remoteMessage);
      onMessageReceived(remoteMessage);  // Call your callback with the received message
    }
  });

  return () => {
    unsubscribeOnMessage();
    unsubscribeOnNotificationOpenedApp();
  };
};

/**
 * Function to send a test notification (for development purposes).
 * 
 * @param {string} token - The FCM token to send the notification to.
 * @param {string} title - The notification title.
 * @param {string} body - The notification body.
 */
export const sendTestNotification = async (token, title, body) => {
  try {
    const message = {
      to: token,
      notification: {
        title: title,
        body: body,
      },
    };

    await messaging().send(message);
    console.log('Test notification sent');
  } catch (error) {
    console.error('Error sending test notification:', error);
  }
};