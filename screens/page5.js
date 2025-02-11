import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import BottomNavBar from "./BottomNavBar"; // Import BottomNavBar component

export default function PlantDetailsScreen({ route, navigation }) {
  const { plant } = route.params; // Accessing the plant data passed from the previous screen

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Top Section: Plant Image and Name */}
        <View style={styles.topSection}>
          <Image source={{ uri: plant.image }} style={styles.plantImage} />
          <Text style={styles.plantName}>{plant.name}</Text>
        </View>

        {/* Charts Section */}
        <View style={styles.chartsContainer}>
          {/* Humidity Level Chart */}
          <View style={styles.chartSection}>
            <Text style={styles.chartTitle}>Humidity Level</Text>
            <Image
              source={{
                uri: "https://via.placeholder.com/300x150?text=Humidity+Chart",
              }}
              style={styles.chartImage}
            />
          </View>

          {/* NPK Pie Chart */}
          <View style={styles.pieChartSection}>
            <Text style={styles.chartTitle}>NPK Levels</Text>
            <Image
              source={{
                uri: "https://via.placeholder.com/150x150?text=NPK+Chart",
              }}
              style={styles.pieChartImage}
            />
          </View>
        </View>

        {/* Details Section */}
        <View style={styles.detailsCard}>
          <Text style={styles.detailsText}>pH: 6.00</Text>
          <Text style={styles.detailsText}>Temp: 71°F</Text>
          <Text style={styles.detailsText}>Moisture Level: Optimal</Text>
          <Text style={styles.detailsText}>Rain Forecast: 40%</Text>
          <Text style={styles.detailsText}>Weather Forecast: Cloudy</Text>
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
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
});
