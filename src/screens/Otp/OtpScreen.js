import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import styles from "./OtpStyles";
import logo from "../Img/solidz_logo_png.png";

export default function OTPScreen({ route, navigation }) {
  const { generatedOTP } = route.params;
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  useEffect(() => {
    // Auto-focus the first OTP input on mount
    inputRefs.current[0]?.focus();
  }, []);

  const handleOTPChange = (value, index) => {
    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerifyOTP = () => {
    const enteredOTP = otp.join(""); // Join OTP array into string
    console.log("Entered OTP:", enteredOTP, "Generated OTP:", generatedOTP);
    if (enteredOTP === generatedOTP) {
      Alert.alert("Success", "OTP Verified Successfully!");
      navigation.navigate("QRScreen"); // Navigate to main screen
    } else {
      Alert.alert("Error", "Incorrect OTP! Try again.");
      // navigation.navigate("Register"); 
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.otpCard}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.message}>We have sent you a code</Text>
          <Text style={styles.subMessage}>
            Please enter it below to verify your phone number
          </Text>

          <View style={styles.otpInputContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={styles.otpBox}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(value) => handleOTPChange(value, index)}
              />
            ))}
          </View>

          {/* Adjust Submit Button Position */}
          <TouchableOpacity style={[styles.button, { marginTop: 20 }]} onPress={handleVerifyOTP}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>

          <Text style={styles.didntReceive}>Didn't receive the code?</Text>
          <TouchableOpacity>
            <Text style={styles.resendText}>Send Again</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
