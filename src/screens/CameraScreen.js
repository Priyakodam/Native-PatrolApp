import React, { useState, useRef, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CameraView, useCameraPermissions, Camera } from 'expo-camera';
import { AntDesign } from '@expo/vector-icons';
import PhotoPreviewSection from "./PhotoPreviewSection";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState("back");
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef(null);

  // Ask for camera permissions on mount
  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  // If permission is null, return nothing (prevents errors)
  if (!permission) return <View />;

  // If permission is denied, show a request button
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const handlePhotoCapture = async () => {
    if (cameraRef.current) {
      const photoData = await cameraRef.current.takePictureAsync({ base64: true });
      setPhoto(photoData);
    }
  };

  if (photo) {
    return <PhotoPreviewSection photo={photo} handleRetakePhoto={() => setPhoto(null)} />;
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        ref={cameraRef}
        photo // enables photo capture
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <AntDesign name="retweet" size={100} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handlePhotoCapture}>
            <AntDesign name="camera" size={100} color="black" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  camera: { flex: 1 },
  buttonContainer: {
    position: "absolute",
    bottom: 100,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  button: {
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 10,
    marginHorizontal: 10,
  },
});