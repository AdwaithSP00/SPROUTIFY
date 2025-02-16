import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigationState } from "@react-navigation/native";

export default function BottomNavBar({ navigation }) {
  const currentRoute = useNavigationState((state) => state.routes[state.index].name);

  const handleHomePress = () => {
    if (currentRoute === "Page4") {
      navigation.navigate("Login"); // Navigate to Login if on Page4
    } else {
      navigation.navigate("Page4"); // Navigate to Page4 otherwise
    }
  };

  const handleNotificationsPress = () => {
    navigation.navigate("NotificationsScreen"); // Navigate to Notifications screen
  };

  return (
    <View style={styles.bottomNav}>
      {/* Home Button */}
      <TouchableOpacity style={styles.navButton} onPress={handleHomePress}>
        <MaterialCommunityIcons name="home-outline" size={30} color="#4CAF50" />
      </TouchableOpacity>

      {/* Notifications Button */}
      <TouchableOpacity style={styles.navButton} onPress={handleNotificationsPress}>
        <MaterialCommunityIcons name="bell-outline" size={30} color="#FF9800" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    height: 60,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  navButton: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});