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
import logo from "../Img/solidz_logo_png.png";
import APIURLS from "../../apiUtils/apiURLs";
import { sendOTP } from "../../apiUtils/apiServices/OTPServices";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleRegister = async () => {
    if (!phoneNumber) {
      Alert.alert("Error", "Please enter your phone number.");
      return;
    }

    try {
      const response = await sendOTP(phoneNumber);
      console.log("Parsed Response:", response);

      if (response.otp) {
        navigation.navigate("Otp", {
          generatedOTP: response.otp.toString(),
          mobile: phoneNumber,
        });
      } else {
        Alert.alert("Error", "OTP not received. Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
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
