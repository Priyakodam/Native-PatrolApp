import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111", // Dark background
    justifyContent: "center",
    alignItems: "center",
  },
  registerCard: {
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 45,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    color: "#000",
    elevation: 2,
  },
  button: {
    width: "100%",
    height: 45,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;
