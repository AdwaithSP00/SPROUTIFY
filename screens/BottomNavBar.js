import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function BottomNavBar({ navigation }) {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Page4")}
      >
        <MaterialCommunityIcons name="home-outline" size={30} color="#4CAF50" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => console.log("Graph clicked")}
      >
        <MaterialCommunityIcons name="chart-line" size={30} color="#4CAF50" />
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