import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Linking } from "react-native";
import { CameraView, Camera } from "expo-camera";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import APIURLS from "../../apiUtils/apiURLs";
import { useUser } from "../../context/UserContext";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { phoneNumber } = useUser();

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarcodeScanned = async ({ type, data }) => {
    if (!scanned) {
      setScanned(true);

      try {
        const payload = {
          data: JSON.stringify({
            mobile: phoneNumber,
            dt: new Date().toISOString().replace("T", " ").slice(0, 19),
            location: data,
          }),
        };

        console.log("Storing this data to API:", payload);

        console.log("Sending QR data to:", APIURLS.COLLECT_QR_DATA);

        const response = await fetch(APIURLS.COLLECT_QR_DATA, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const responseText = await response.text();
        console.log("Raw API Response:", responseText);

        try {
          const jsonSafeString = responseText.replace(/'/g, '"');
          const result = JSON.parse(jsonSafeString);

          if (result.status === "success") {
            alert("QR data collected and stored successfully.");
            console.log("Parsed Success Response:", result);
          } else {
            alert("Failed to store QR data.");
            console.log("Parsed Error Response:", result);
          }
        } catch (parseError) {
          console.error("Response is not JSON parsable:", parseError);
          alert("Received invalid JSON format from server.");
        }
      } catch (error) {
        console.error("Network or Server Error:", error);
        alert("Error sending QR data. Check console for details.");
      }

      if (data.startsWith("http://") || data.startsWith("https://")) {
        Linking.openURL(data);
      } else {
        alert(`Scanned Data: ${data}`);
      }
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
        style={StyleSheet.absoluteFillObject}
      >
        <View style={styles.overlay}>
          <View style={styles.scanBorder} />
        </View>
      </CameraView>

      {scanned && (
        <View style={styles.buttonContainer}>
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scanBorder: {
    width: responsiveWidth(60),
    height: responsiveWidth(60),
    borderWidth: 4,
    borderColor: "white",
    borderRadius: 10,
    position: "absolute",
  },
  buttonContainer: {
    position: "absolute",
    bottom: responsiveHeight(12), // Above the navbar
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingVertical: responsiveHeight(3.5),
    paddingHorizontal: responsiveWidth(10),
    borderRadius: 30,
  },
});
