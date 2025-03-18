import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import styles from './QRCodeStyles'; //  Import styles from separate file

const QRScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState('back'); // Ensures a valid string value

  if (!permission) return <View />;
  
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to access the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  const takePicture = async () => {
    Alert.alert('Capture Feature', 'Taking pictures is not implemented yet.');
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        {/*  Square Scanner Frame Overlay */}
        <View style={styles.overlay}>
          <View style={styles.scannerFrame}>
            <View style={styles.borderTopLeft} />
            <View style={styles.borderTopRight} />
            <View style={styles.borderBottomLeft} />
            <View style={styles.borderBottomRight} />
          </View>
        </View>

        {/*  Camera Controls */}
        <View style={styles.controls}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.buttonText}>Flip Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <Text style={styles.buttonText}>Capture</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};

export default QRScreen;