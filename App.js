import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View, Button } from "react-native";
import RegisterScreen from "./screens/Register/RegisterScreen";
import NavScreen from "./screens/Navbar/NavScreen";
import ScheduleScreen from "./screens/Schedule/ScheduleScreen";
import RecordScreen from "./screens/Record/RecordScreen";
import ChecklistScreen from "./screens/Checklist/ChecklistScreen";
import QRScreen from "./screens/QRCodeScanner/QRCodeScreen";
import OtpScreen from "./screens/Otp/OtpScreen";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Otp" component={OtpScreen} />
        <Stack.Screen name="Nav" component={NavScreen} />
        <Stack.Screen name="Schedule" component={ScheduleScreen} />
        <Stack.Screen name="Checklist" component={ChecklistScreen} />
        <Stack.Screen name="Record" component={RecordScreen} />
        <Stack.Screen name="QRScreen" component={QRScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
