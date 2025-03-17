import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Camera } from "expo-camera";
import { Audio } from "expo-av";
import Icon from "react-native-vector-icons/FontAwesome";
import * as DocumentPicker from 'expo-document-picker';
import { Video } from 'expo-av'; // Import Video component for video playback

import styles from "./RecordStyles";

const RecordScreen = () => {
  const [recordType, setRecordType] = useState("audio");
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);
  const [recordedUri, setRecordedUri] = useState(null);
  const [sound, setSound] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasAudioPermission, setHasAudioPermission] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const audioPermission = await Audio.requestPermissionsAsync();
      const cameraPermission = await Camera.requestCameraPermissionsAsync();

      setHasAudioPermission(audioPermission.status === "granted");
      setHasCameraPermission(cameraPermission.status === "granted");
    })();
  }, []);

  const handleStartRecording = async () => {
    setRecordedUri(null);

    try {
      if (recordType === "audio" && hasAudioPermission) {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );

        setRecording(recording);
        setIsRecording(true);
      } else if (recordType === "video" && cameraRef.current && cameraReady) {
        setIsRecording(true);
        const videoRecording = await cameraRef.current.recordAsync({
          maxDuration: 60,
          quality: Camera.Constants.VideoQuality["480p"],
        });

        setRecordedUri(videoRecording.uri);
        setIsRecording(false);
      }
    } catch (error) {
      console.error("Failed to start recording:", error);
      setIsRecording(false);
    }
  };

  const handleStopRecording = async () => {
    try {
      if (recordType === "audio" && recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setRecordedUri(uri);
        setRecording(null);
        setIsRecording(false);
      } else if (recordType === "video" && cameraRef.current) {
        await cameraRef.current.stopRecording();
        setIsRecording(false);
      }
    } catch (error) {
      console.error("Failed to stop recording:", error);
    }
  };

  const handlePlayRecording = async () => {
    if (!recordedUri) return;

    try {
      if (recordType === "audio") {
        const { sound: playbackSound } = await Audio.Sound.createAsync(
          { uri: recordedUri },
          { shouldPlay: true }
        );
        setSound(playbackSound);

        playbackSound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) setSound(null);
        });

        await playbackSound.playAsync();
      }
    } catch (error) {
      console.error("Error playing the recording:", error);
    }
  };

  const handleUpload = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (result.type === 'success') {
      Alert.alert("File uploaded", `File name: ${result.name}`);
    } else {
      Alert.alert("Upload cancelled");
    }
  };

  useEffect(() => {
    return sound ? () => sound.unloadAsync() : undefined;
  }, [sound]);

  if (hasAudioPermission === null || hasCameraPermission === null) {
    return <Text>Requesting permissions...</Text>;
  }

  if (!hasAudioPermission) {
    return <Text>Permission to access microphone is denied.</Text>;
  }

  if (!hasCameraPermission && recordType === "video") {
    return <Text>Permission to access camera is denied.</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Top Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, recordType === "audio" && styles.activeTab]}
          onPress={() => setRecordType("audio")}
        >
          <Icon name="microphone" size={20} color="#fff" />
          <Text style={styles.tabText}>Audio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, recordType === "video" && styles.activeTab]}
          onPress={() => setRecordType("video")}
        >
          <Icon name="video-camera" size={20} color="#fff" />
          <Text style={styles.tabText}>Video</Text>
        </TouchableOpacity>
      </View>

      {/* Recording Section */}
      <View style={styles.recordingSection}>
        {recordType === "video" && (
          <Camera
            ref={cameraRef}
            style={{ width: 300, height: 300, marginBottom: 20 }}
            type={Camera.Constants.Type.back}
            onCameraReady={() => setCameraReady(true)}
          />
        )}

        <Text style={styles.recordingStatus}>
          Status: {isRecording ? "Recording..." : "Idle"}
        </Text>

        {!isRecording ? (
          <TouchableOpacity
            style={styles.recordButton}
            onPress={handleStartRecording}
            disabled={recordType === "video" && !cameraReady}
          >
            <Icon name="play-circle" size={40} color="#fff" />
            <Text style={styles.buttonText}>Start Recording</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.stopButton} onPress={handleStopRecording}>
            <Icon name="stop-circle" size={40} color="#fff" />
            <Text style={styles.buttonText}>Stop Recording</Text>
          </TouchableOpacity>
        )}

        {recordedUri && (
          <View style={styles.previewContainer}>
            {recordType === "audio" ? (
              <>
                <TouchableOpacity style={styles.playButton} onPress={handlePlayRecording}>
                  <Icon name="play" size={30} color="#fff" />
                  <Text style={styles.buttonText}>Play Audio</Text>
                </TouchableOpacity>
                <Text style={styles.previewText}>Audio recorded: {recordedUri}</Text>
              </>
            ) : (
              <>
                <Text style={styles.previewText}>Video recorded: {recordedUri}</Text>
                <Video
                  source={{ uri: recordedUri }}
                  style={{ width: 300, height: 300 }}
                  useNativeControls
                  resizeMode="contain"
                  isLooping
                />
              </>
            )}
          </View>
        )}

        <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
          <Icon name="upload" size={30} color="#fff" />
          <Text style={styles.buttonText}>Upload</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RecordScreen;