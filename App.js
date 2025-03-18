import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, View } from "react-native";
import RegisterScreen from "./screens/Register/RegisterScreen";
import NavScreen from "./screens/Navbar/NavScreen";
import ScheduleScreen from "./screens/Schedule/ScheduleScreen";
import RecordScreen from "./screens/Record/RecordScreen";
// import CameraScreen from './screens/CameraScreen';
import AudioScreen from './screens/AudioScreen';
// import VideoScreen from './screens/VideoScreen';
import Video from './screens/Video';
import ChecklistScreen from "./screens/Checklist/ChecklistScreen";
import QRScreen from "./screens/QRCodeScanner/QRCodeScreen";
import OtpScreen from "./screens/Otp/OtpScreen";
import UploadScreen from "./screens/UploadScreen";
import CameraFunction from "./screens/CameraFunction";

const Stack = createStackNavigator();

// Higher-Order Component to wrap screens with NavScreen
const ScreenWithNav = ({ component: Component }) => {
  return (
    <View style={styles.container}>
      <Component />
      <NavScreen />
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* No Navbar on Register and OTP Screens */}
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Otp" component={OtpScreen} options={{ headerShown: false }} />

        {/* Screens with Navbar */}
        <Stack.Screen
          name="Schedule"
          options={{ headerShown: false }}
        >
          {() => <ScreenWithNav component={ScheduleScreen} />}
        </Stack.Screen>

        <Stack.Screen
          name="Checklist"
          options={{ headerShown: false }}
        >
          {() => <ScreenWithNav component={ChecklistScreen} />}
        </Stack.Screen>

        <Stack.Screen
          name="Record"
          options={{ headerShown: false }}
        >
          {() => <ScreenWithNav component={RecordScreen} />}
        </Stack.Screen>
        {/* <Stack.Screen name="CameraScreen" component={CameraScreen} /> */}
        <Stack.Screen name="AudioScreen" component={AudioScreen} />
        {/* <Stack.Screen name="VideoScreen" component={VideoScreen} /> */}
        <Stack.Screen name="Video" component={Video} />
        <Stack.Screen name="UploadScreen" component={UploadScreen} />
        <Stack.Screen name="CamFunScreen" component={CameraFunction} />

        <Stack.Screen
          name="QRScreen"
          options={{ headerShown: false }}
        >
          {() => <ScreenWithNav component={QRScreen} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
