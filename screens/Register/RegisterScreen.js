import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./RegisterStyles";
import logo from "../../assets/solidz_logo.avif";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleRegister = () => {
    if (!phoneNumber) {
      Alert.alert("Error", "Please enter all fields.");
      return;
    }

    const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();

    console.log("Generated OTP:", generatedOTP);

    Alert.alert("Your OTP", `Your OTP is: ${generatedOTP}`);

    setTimeout(() => {
      navigation.navigate("Otp", { generatedOTP });
    }, 500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        >
          <View style={styles.registerCard}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.title}>Register Your Account</Text>

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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
