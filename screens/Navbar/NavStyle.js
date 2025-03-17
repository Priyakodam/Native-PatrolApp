import { StyleSheet, Platform} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

const styles = StyleSheet.create({
  topBar: {
    position: "absolute", 
    top: 15,
    left: 0,
    width: "100%",
    height: responsiveHeight(10),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: responsiveWidth(5), 
    // paddingVertical: responsiveHeight(2.5), 
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#282927",
    zIndex: 1000,
    elevation: 5, 
    shadowColor: "#000", 
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  logo: {
    height: responsiveHeight(7), // Adjust height based on screen size
    width: responsiveWidth(25), // Adjust width based on screen size
    resizeMode: "contain",
  },
  topRightIcons: {
    flexDirection: "row",
    gap: responsiveWidth(4), // Dynamic gap
  },
  glassNavbar: {
    position: "absolute",
    bottom: responsiveHeight(2), // Responsive bottom spacing
    left: "50%",
    transform: [{ translateX: -responsiveWidth(40) }], // Adjusted for new width
    width: responsiveWidth(80), // Increased width
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "black",
    padding: responsiveWidth(6), 
    borderRadius: responsiveWidth(10), 
    shadowColor: "#fff",
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
});

export default styles;

