import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import styles from "./QRCodeStyles";

export default function QRScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Welcome to QR Screen</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
    </View>
  );
}


