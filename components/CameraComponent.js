import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet, Alert } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

const CameraComponent = ({ onCapture }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [photoUri, setPhotoUri] = useState(null);
  
  // Getting the available camera devices
  const devices = useCameraDevices();
  const device = devices.back; // For rear camera, use 'front' for front camera
  
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
        setPhotoUri(photo.uri);
        onCapture(photo.uri); // Pass the photo URI to parent for further processing
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