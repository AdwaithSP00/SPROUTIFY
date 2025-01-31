import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import BottomNavBar from "./BottomNavBar"; // Import BottomNavBar component

export default function PlantDetailsScreen({ route, navigation }) {
  const { plant } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topSection}>
          <Image source={{ uri: plant.image }} style={styles.plantImage} />
          <Text style={styles.plantName}>{plant.name}</Text>
        </View>

        <View style={styles.detailsCard}>
          <Text>pH: 6.00</Text>
          <Text>Temp: 71°F</Text>
          <Text>Moisture Level: Optimal</Text>
        </View>
      </ScrollView>

      {/* Common Bottom Navigation */}
      <BottomNavBar navigation={navigation} />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  topSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  plantImage: {
    width: 120,
    height: 150,
    resizeMode: "contain",
    marginBottom: 10,
  },
  plantName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  chartsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  chartSection: {
    backgroundColor: "#E8F5E9",
    padding: 15,
    borderRadius: 10,
    width: "48%",
    elevation: 3,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  chartImage: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
  },
  pieChartSection: {
    backgroundColor: "#E8F5E9",
    padding: 15,
    borderRadius: 10,
    width: "48%",
    alignItems: "center",
    elevation: 3,
  },
  pieChartImage: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  detailsCard: {
    backgroundColor: "#E8F5E9",
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  detailsText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
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