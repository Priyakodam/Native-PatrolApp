import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import styles from './RecordStyles';

export default function RecordScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Welcome to Record Screen</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
    </View>
  );
}


