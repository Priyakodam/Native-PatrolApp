import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import styles from './ScheduleStyles';

export default function ScheduleScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Welcome to Schedule Screen</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
    </View>
  );
}


