import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';
import axios from 'axios';
import APIURLS from "../apiURLs";

export const uploadVideoToAPI = async (videoUri, phoneNumber,navigation) => {
  try {
    const base64Video = await FileSystem.readAsStringAsync(videoUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const payload = {
        data: JSON.stringify({
          mobile: phoneNumber,
          dt: new Date().toISOString().replace("T", " ").slice(0, 19),
          location: "QR12345",
          videoData: base64Video,
        }),
      };
      
      
      

    console.log("Payload sending to API:", JSON.stringify(payload, null, 2));

    const response = await axios.post(APIURLS.COLLECT_QR_DATA, payload, {
        headers: { "Content-Type": "application/json" },
      });

    console.log("Video uploaded successfully: ", response.data);
    console.log("Stored Data Response: ", JSON.stringify(response.data, null, 2));
    Alert.alert(
        'Success',
        'Video uploaded successfully',
        [
          { text: 'OK', onPress: () => navigation.navigate('Record') }
        ]
      );
    return response.data;
  } catch (error) {
    console.error("Error uploading video: ", error.response ? error.response.data : error.message);
    throw error;
  }
};
