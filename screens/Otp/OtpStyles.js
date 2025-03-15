import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111", // Dark background
    justifyContent: "center",
    alignItems: "center",
  },
  otpCard: {
    width: "85%",
    backgroundColor: "#d3d3d3", // Light grey card
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    shadowColor: "#fff",
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
    marginBottom: 10,
  },
  message: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  subMessage: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  phoneNumber: {
    fontSize: 18,
    color: "blue",
    fontWeight: "bold",
    marginBottom: 20,
  },
  otpInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  otpBox: {
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    textAlign: "center",
    fontSize: 18,
    borderRadius: 5,
    marginHorizontal: 5,
    elevation: 2,
  },
  didntReceive: {
    fontSize: 14,
    color: "#333",
    marginTop: 20,
  },
  resendText: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    marginTop: 5,
  },
});

export default styles;
