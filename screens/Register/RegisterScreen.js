import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import styles from './RegisterStyles';

export default function RegisterScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Welcome to Register Screen</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
    </View>
  );
}


