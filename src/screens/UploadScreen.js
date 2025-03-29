import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { FontAwesome5 } from "@expo/vector-icons";
import { Video } from "expo-av";

export default function UploadScreen() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState("");

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // Allow all file types
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      setSelectedFile(result.assets[0].uri);
      setFileType(result.assets[0].mimeType);
    } catch (error) {
      console.error("Error picking file:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickFile}>
        <FontAwesome5 name="upload" size={50} color="white" />
      </TouchableOpacity>

      {selectedFile && (
        <View style={styles.fileContainer}>
          {fileType.startsWith("image/") ? (
            <Image source={{ uri: selectedFile }} style={styles.image} />
          ) : fileType.startsWith("video/") ? (
            <Video
              source={{ uri: selectedFile }}
              style={styles.video}
              useNativeControls
              resizeMode="contain"
              shouldPlay
            />
          ) : fileType.startsWith("audio/") ? (
            <Text style={styles.audioText}>Audio file selected: {selectedFile.split("/").pop()}</Text>
          ) : (
            <Text style={styles.fileText}>File selected: {selectedFile.split("/").pop()}</Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#222" },
  button: { padding: 20, backgroundColor: "#444", borderRadius: 50, alignItems: "center" },
  fileContainer: { marginTop: 20, alignItems: "center" },
  image: { width: 200, height: 200 },
  video: { width: 300, height: 200 },
  audioText: { color: "white", marginTop: 10 },
  fileText: { color: "white", marginTop: 10 },
});
//-----------------With Example API Server------------------------

// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
// import * as DocumentPicker from "expo-document-picker";
// import { FontAwesome5 } from "@expo/vector-icons";
// import { Video } from "expo-av";

// export default function UploadScreen() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [fileType, setFileType] = useState("");

//   // Function to pick a file
//   const pickFile = async () => {
//     try {
//       const result = await DocumentPicker.getDocumentAsync({
//         type: "*/*", // Allow all file types
//         copyToCacheDirectory: true,
//       });

//       if (result.canceled) return;

//       const fileUri = result.assets[0].uri;
//       const mimeType = result.assets[0].mimeType;

//       setSelectedFile(fileUri);
//       setFileType(mimeType);

//       // Call API to upload file
//       await uploadToServer(fileUri);
//     } catch (error) {
//       console.error("Error picking file:", error);
//     }
//   };

//   // Function to upload file to API
//   const uploadToServer = async (fileUri) => {
//     try {
//       console.log("Uploading file:", fileUri);

//       // Simulate API upload (Replace with actual fetch/axios request)
//       await new Promise((resolve) => setTimeout(resolve, 2000));

//       Alert.alert("Success", "File uploaded successfully!");
//     } catch (error) {
//       console.error("Upload failed:", error);
//       Alert.alert("Error", "File upload failed.");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.uploadButton} onPress={pickFile}>
//         <FontAwesome5 name="share" size={50} color="white" />
//       </TouchableOpacity>

//       {selectedFile && (
//         <View style={styles.fileContainer}>
//           {fileType.startsWith("image/") ? (
//             <Image source={{ uri: selectedFile }} style={styles.image} />
//           ) : fileType.startsWith("video/") ? (
//             <Video
//               source={{ uri: selectedFile }}
//               style={styles.video}
//               useNativeControls
//               resizeMode="contain"
//               shouldPlay
//             />
//           ) : fileType.startsWith("audio/") ? (
//             <Text style={styles.audioText}>Audio: {selectedFile.split("/").pop()}</Text>
//           ) : (
//             <Text style={styles.fileText}>File: {selectedFile.split("/").pop()}</Text>
//           )}
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#222" },
//   uploadButton: { padding: 20, backgroundColor: "#444", borderRadius: 50, alignItems: "center" },
//   fileContainer: { marginTop: 20, alignItems: "center" },
//   image: { width: 200, height: 200 },
//   video: { width: 300, height: 200 },
//   audioText: { color: "white", marginTop: 10 },
//   fileText: { color: "white", marginTop: 10 },
// });

//------------------With Solidz Api-------------------------------

// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
// import * as DocumentPicker from "expo-document-picker";
// import * as FileSystem from "expo-file-system";
// import NetInfo from "@react-native-community/netinfo";
// import { FontAwesome5 } from "@expo/vector-icons";
// import { Video } from "expo-av";
// import APIURLS from "../apiUtils/apiURLs"; // Ensure this path is correct

// export default function UploadScreen() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [fileType, setFileType] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("1234567890"); // Dummy phone number, replace as needed

//   // Function to pick a file
//   const pickFile = async () => {
//     try {
//       const result = await DocumentPicker.getDocumentAsync({
//         type: "*/*", // Allow all file types
//         copyToCacheDirectory: true,
//       });

//       if (result.canceled) return;

//       const fileUri = result.assets[0].uri;
//       const mimeType = result.assets[0].mimeType;

//       setSelectedFile(fileUri);
//       setFileType(mimeType);

//       // Call API to upload file
//       await uploadToServer(fileUri, mimeType);
//     } catch (error) {
//       console.error("Error picking file:", error);
//     }
//   };

//   // Function to upload file to API
//   const uploadToServer = async (fileUri, mimeType) => {
//     if (!fileUri) {
//       Alert.alert("No File", "Please select a file first.");
//       return;
//     }

//     const { isConnected } = await NetInfo.fetch();
//     if (!isConnected) {
//       Alert.alert("No Internet", "File will be uploaded when you regain connectivity.");
//       console.log("Internet Connection:", isConnected);
//       return;
//     }

//     try {
//       // Read file as base64
//       const base64File = await FileSystem.readAsStringAsync(fileUri, {
//         encoding: FileSystem.EncodingType.Base64,
//       });

//       // Construct payload
//       const payload = {
//         data: JSON.stringify({
//           mobile: phoneNumber,
//           file: base64File,
//           fileType: mimeType,
//           timestamp: new Date().toISOString(),
//         }),
//       };

//       console.log("Payload being sent to API:", JSON.stringify(payload, null, 2));

//       // Send to API
//       const response = await fetch(APIURLS.COLLECT_QR_DATA, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       const rawResponse = await response.text();
//       console.log("Raw API Response:", rawResponse);

//       try {
//         const parsedResponse = JSON.parse(rawResponse.replace(/'/g, '"'));
//         console.log("Parsed Success Response:", JSON.stringify(parsedResponse, null, 2));
//       } catch (parseErr) {
//         console.error("JSON Parse Error. Raw response received:", rawResponse);
//       }

//       if (response.ok) {
//         Alert.alert("Success", "File uploaded successfully!");
//       } else {
//         Alert.alert("Error", "Upload failed.");
//       }
//     } catch (error) {
//       console.error("Error uploading file to API:", error);
//       Alert.alert("Error", "Failed to upload file.");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.uploadButton} onPress={pickFile}>
//         <FontAwesome5 name="share" size={50} color="white" />
//       </TouchableOpacity>

//       {selectedFile && (
//         <View style={styles.fileContainer}>
//           {fileType.startsWith("image/") ? (
//             <Image source={{ uri: selectedFile }} style={styles.image} />
//           ) : fileType.startsWith("video/") ? (
//             <Video
//               source={{ uri: selectedFile }}
//               style={styles.video}
//               useNativeControls
//               resizeMode="contain"
//               shouldPlay
//             />
//           ) : fileType.startsWith("audio/") ? (
//             <Text style={styles.audioText}>Audio: {selectedFile.split("/").pop()}</Text>
//           ) : (
//             <Text style={styles.fileText}>File: {selectedFile.split("/").pop()}</Text>
//           )}
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#222" },
//   uploadButton: { padding: 20, backgroundColor: "#444", borderRadius: 50, alignItems: "center" },
//   fileContainer: { marginTop: 20, alignItems: "center" },
//   image: { width: 200, height: 200 },
//   video: { width: 300, height: 200 },
//   audioText: { color: "white", marginTop: 10 },
//   fileText: { color: "white", marginTop: 10 },
// });

