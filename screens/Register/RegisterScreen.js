import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./RegisterStyles";
import logo from "../../assets/solidz_logo.avif";

const RegisterScreen = () => {
  const navigation = useNavigation();
  // const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleRegister = () => {
    if (!phoneNumber) {
      Alert.alert("Error", "Please enter all fields.");
      return;
    }

    // Generate a 6-digit OTP
    const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();

    console.log("Generated OTP:", generatedOTP); // Check if this logs in the console

    // Show OTP alert
    Alert.alert("Your OTP", `Your OTP is: ${generatedOTP}`);

    // Delay navigation to ensure alert shows up first
    setTimeout(() => {
      navigation.navigate("Otp", { generatedOTP });
    }, 500); // Adjust delay if needed
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.registerCard}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>Register Your Account</Text>

        {/* <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#888"
          value={fullName}
          onChangeText={setFullName}
        /> */}
        <TextInput
          style={styles.input}
          placeholder="Phone number"
          placeholderTextColor="#888"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
