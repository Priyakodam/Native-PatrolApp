import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons"; // Use FontAwesome5 icons

export default function RecordScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {/* Image Capture Icon */}
        <TouchableOpacity onPress={() => navigation.navigate("CamFunScreen")}>
          <View style={styles.iconWrapper}>
            <FontAwesome5 name="camera" size={50} color="white" />
          </View>
        </TouchableOpacity>

        {/* Audio Recording Icon */}
        <TouchableOpacity onPress={() => navigation.navigate("AudioScreen")}>
          <View style={styles.iconWrapper}>
            <FontAwesome5 name="microphone" size={50} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.iconContainer}>
        {/* Video Recording Icon */}
        {/* <TouchableOpacity onPress={() => navigation.navigate("Video")}>
          <View style={styles.iconWrapper}>
            <FontAwesome5 name="video" size={50} color="white" />
          </View>
        </TouchableOpacity> */}

        {/* File Upload Icon */}
        <TouchableOpacity onPress={() => navigation.navigate("UploadScreen")}>
          <View style={styles.iconWrapper}>
            <FontAwesome5 name="upload" size={50} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#222" },
  iconContainer: { flexDirection: "row", justifyContent: "space-around", width: "80%", marginVertical: 20 },
  iconWrapper: { padding: 20, backgroundColor: "#444", borderRadius: 10, alignItems: "center" },
});
