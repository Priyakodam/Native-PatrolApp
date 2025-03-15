import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import styles from './ChecklistStyles';
import { MaterialIcons } from '@expo/vector-icons';

export default function ChecklistScreen({ navigation }) {
  const [tasks, setTasks] = useState([
    { id: '1', text: 'Check Entry & Exit Points', checked: false },
    { id: '2', text: 'Inspect Surveillance Cameras', checked: false },
    { id: '3', text: 'Verify Employee IDs / Visitor Logs', checked: false },
    { id: '4', text: 'Check Fire Extinguishers & Emergency Equipment', checked: false },
    { id: '5', text: 'Inspect Doors & Windows for Unauthorized Access', checked: false },
    { id: '6', text: 'Look for Suspicious Activities / Objects', checked: false },
    { id: '7', text: 'Ensure Proper Lighting in All Areas', checked: false },
    { id: '8', text: 'Patrol Parking Lots & Vehicles', checked: false },
    { id: '9', text: 'Record Incidents or Unusual Activity', checked: false },
    { id: '10', text: 'Communicate with Security Team', checked: false },
  ]);

  // Toggle checkbox
  const toggleCheck = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, checked: !task.checked } : task
      )
    );
  };

  // Reset checklist
  const resetChecklist = () => {
    setTasks((prevTasks) => prevTasks.map((task) => ({ ...task, checked: false })));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guard Patrol Checklist</Text>
      <FlatList
        data={tasks}
        keyExtractor={(task) => task.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => toggleCheck(item.id)}>
            <MaterialIcons
              name={item.checked ? 'check-box' : 'check-box-outline-blank'}
              size={24}
              color={item.checked ? 'green' : 'black'}
            />
            <Text style={styles.itemText}>{item.text}</Text>
          </TouchableOpacity>
        )}
      />
      <Button title="Reset Checklist" onPress={resetChecklist} />
      <Button title="Submit Report" onPress={() => alert('Checklist Submitted!')} />
      <Button title="Go to Dashboard" onPress={() => navigation.navigate('Dashboard')} />
    </View>
  );
}
