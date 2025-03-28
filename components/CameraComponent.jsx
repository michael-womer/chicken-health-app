import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet, Alert } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { useDispatch } from 'react-redux';  // Import useDispatch
import { setPhotoUri } from '../redux/actions';  // Import the action to set the photo URI

const CameraComponent = ({ onCapture }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [photoUri, setPhotoUriState] = useState(null);
  
  // Get available camera devices
  const devices = useCameraDevices();
  const device = devices.back;  // Use rear camera by default
  
  // Create dispatch function
  const dispatch = useDispatch();

  // Request camera permission
  useEffect(() => {
    const requestPermission = async () => {
      const permission = await Camera.requestCameraPermission();
      setHasPermission(permission === 'authorized');
    };
    requestPermission();
  }, []);

  // When the camera is ready, allow capture
  useEffect(() => {
    if (device) {
      setIsCameraReady(true);
    }
  }, [device]);

  const handleCapture = async () => {
    if (isCameraReady && hasPermission) {
      try {
        const photo = await device.takePhoto({
          qualityPrioritization: 'quality',
        });
        setPhotoUriState(photo.uri);  // Set photo URI to local state
        dispatch(setPhotoUri(photo.uri));  // Dispatch action to Redux store with the captured photo URI
        onCapture(photo.uri);  // Pass the photo URI to the parent component for further processing
      } catch (error) {
        Alert.alert('Error', 'Failed to take photo.');
        console.error(error);
      }
    } else {
      Alert.alert('Permission Denied', 'Camera permission is required to capture images.');
    }
  };

  if (hasPermission === null) {
    return <Text>Loading...</Text>;
  }

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Camera permission is not granted.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isCameraReady && device ? (
        <>
          <Camera
            style={styles.camera}
            device={device}
            isActive={true}
            photo={true}
          />
          <Button title="Capture Photo" onPress={handleCapture} />
          {photoUri && <Text style={styles.photoUri}>Photo Captured: {photoUri}</Text>}
        </>
      ) : (
        <Text>Waiting for camera...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  camera: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  text: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
  },
  photoUri: {
    color: 'white',
    marginTop: 20,
    fontSize: 14,
  },
});

export default CameraComponent;