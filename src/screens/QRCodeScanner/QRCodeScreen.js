import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Linking } from "react-native";
import { CameraView, Camera } from "expo-camera";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarcodeScanned = ({ type, data }) => {
    if (!scanned) {
      setScanned(true);

      // Check if the scanned data is a valid URL
      if (data.startsWith("http://") || data.startsWith("https://")) {
        Linking.openURL(data); // Redirect to URL
      } else {
        alert(`Scanned Data: ${data}`); // Show alert if not a URL
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
        {/* QR Scan Border Frame */}
        <View style={styles.overlay}>
          <View style={styles.scanBorder} />
        </View>
      </CameraView>

      {scanned && (
        <View style={styles.buttonContainer}>
          <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
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
