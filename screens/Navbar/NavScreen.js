import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./NavStyle";
import logo from "../../assets/solidz_logo.avif";

const NavScreen = () => {
  const navigation = useNavigation();
  const [activeIcon, setActiveIcon] = useState("qrscan");

  const handleIconClick = (iconName) => {
    setActiveIcon(iconName);
    navigation.navigate(iconName);
  };

  return (
    <>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Image source={logo} style={styles.logo} />
        <View style={styles.topRightIcons}>
          <TouchableOpacity
            onPress={() => console.log("Notifications clicked")}
          >
            <Icon name="bell" size={25} color="#2a2927" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => console.log("Profile clicked")}>
            <Icon name="user-circle" size={32} color="#2a2927" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Navbar */}
      <View style={styles.glassNavbar}>
        <TouchableOpacity onPress={() => navigation.navigate("QRScreen")}>
          <Icon
            name="qrcode"
            size={22}
            color={activeIcon === "QRScreen" ? "black" : "white"}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Record")}>
          <Icon
            name="microphone"
            size={22}
            color={activeIcon === "record" ? "black" : "white"}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Schedule")}>
          <Icon
            name="calendar"
            size={22}
            color={activeIcon === "schedule" ? "black" : "white"}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Checklist")}>
          <Icon
            name="clipboard"
            size={22}
            color={activeIcon === "checklist" ? "black" : "white"}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default NavScreen;
