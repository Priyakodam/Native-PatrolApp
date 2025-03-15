import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './QRCodeStyles';

const QRScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* QR Scan Section */}
      <View style={styles.qrSection}>
        <Icon name="camera" size={100} color="gray" style={styles.cameraIcon} />
        
        <TouchableOpacity style={styles.scanButton} onPress={() => console.log("Scanning...")}>
          <Text style={styles.scanButtonText}>Scan QR Code</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QRScreen;
