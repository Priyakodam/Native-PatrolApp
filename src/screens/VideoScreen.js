import React, { useState, useRef, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Camera } from "expo-camera";
import { AntDesign } from "@expo/vector-icons";
import { Video } from "expo-av";

export default function VideoScreen() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [recording, setRecording] = useState(false);
  const [videoUri, setVideoUri] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>We need your permission to use the camera</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const startRecording = async () => {
    if (cameraRef.current) {
      setRecording(true);
      const video = await cameraRef.current.recordAsync();
      setVideoUri(video.uri);
      setRecording(false);
    }
  };

  const stopRecording = async () => {
    if (cameraRef.current) {
      await cameraRef.current.stopRecording();
      setRecording(false);
    }
  };

  return (
    <View style={styles.container}>
      {!videoUri ? (
        <Camera style={styles.camera} ref={cameraRef} type={Camera.Constants.Type.back}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={recording ? stopRecording : startRecording}>
              <AntDesign name={recording ? "pausecircle" : "videocamera"} size={80} color="red" />
              <Text>{recording ? "Stop" : "Record"}</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <Video source={{ uri: videoUri }} style={styles.video} useNativeControls resizeMode="contain" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  camera: { flex: 1, width: "100%" },
  video: { flex: 1, width: "100%" },
  buttonContainer: { position: "absolute", bottom: 50, width: "100%", alignItems: "center" },
  button: { alignItems: "center" },
});
