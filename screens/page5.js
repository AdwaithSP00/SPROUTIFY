import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { getDatabase, ref, onValue } from "firebase/database"; // Firebase imports
import BottomNavBar from "./BottomNavBar"; // Bottom Navigation Component

export default function PlantDetailsScreen({ route, navigation }) {
  const { plant } = route.params;
  const [sensorData, setSensorData] = useState({
    Humidity: "--",
    Moisture_1: "--",
    Soil_Moisture: "--",
    Temperature: "--",
  });

  useEffect(() => {
    const db = getDatabase();
    const sensorRef = ref(db, "sensors"); // Path to Firebase data

    // Listening for real-time changes
    const unsubscribe = onValue(sensorRef, (snapshot) => {
      if (snapshot.exists()) {
        setSensorData(snapshot.val());
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Top Section with Image */}
        <View style={styles.topSection}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: plant.image }} style={styles.plantImage} />
          </View>
          <Text style={styles.plantName}>{plant.name}</Text>
        </View>

        {/* Sensor Data Section */}
        <View style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>🌿 Sensor Data</Text>
          <View style={styles.sensorRow}>
            <View style={styles.sensorBox}>
              <Text style={styles.sensorLabel}>🌡 Temperature</Text>
              <Text style={styles.sensorValue}>{sensorData.Temperature}°C</Text>
            </View>
            <View style={styles.sensorBox}>
              <Text style={styles.sensorLabel}>💧 Humidity</Text>
              <Text style={styles.sensorValue}>{sensorData.Humidity}%</Text>
            </View>
          </View>
          <View style={styles.sensorRow}>
            <View style={styles.sensorBox}>
              <Text style={styles.sensorLabel}>🌱 Soil Moisture</Text>
              <Text style={styles.sensorValue}>{sensorData.Soil_Moisture}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
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
    paddingTop: 50,
  },
  topSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  imageContainer: {
    backgroundColor: "#FFF",
    padding: 15, // 🔹 Increased padding
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  plantImage: {
    width: 150,  // 🔹 Increased width
    height: 180, // 🔹 Increased height
    resizeMode: "contain",
  },
  plantName: {
    fontSize: 22,  // 🔹 Slightly larger text
    fontWeight: "bold",
    color: "#4CAF50",
    marginTop: 10,
  },
  detailsCard: {
    backgroundColor: "#E8F5E9",
    padding: 20,
    borderRadius: 12,
    elevation: 3,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 10,
    textAlign: "center",
  },
  sensorRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sensorBox: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
    elevation: 2,
  },
  sensorLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 5,
  },
  sensorValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});
