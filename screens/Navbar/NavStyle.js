import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "black",
  },
  logo: {
    height: 50,
    width: 100,
    resizeMode: "contain",
  },
  topRightIcons: {
    flexDirection: "row",
    gap: 15,
  },
  glassNavbar: {
    position: "absolute",
    bottom: 10,
    left: "50%",
    transform: [{ translateX: -150 }],
    width: 300,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "black",
    padding: 10,
    borderRadius: 30,
    shadowColor: "#fff",
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
});

export default styles;
