import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import styles from "./OtpStyles";

export default function OTPScreen({ navigation }) {
  return (
    <View OtpStyles={styles.container}>
      <Text>Welcome to OTP Screen</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
    </View>
  );
}


