import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import styles from "./ChecklistStyles";

export default function ChecklistScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Welcome to Checklist Screen</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
    </View>
  );
}


