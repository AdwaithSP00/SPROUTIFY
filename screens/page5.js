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
        <View style={styles.topSection}>
          <Image source={{ uri: plant.image }} style={styles.plantImage} />
          <Text style={styles.plantName}>{plant.name}</Text>
        </View>

        {/* Sensor Data Card */}
        <View style={styles.detailsCard}>
          <Text style={styles.detailsText}>🌡 Temperature: {sensorData.Temperature}°C</Text>
          <Text style={styles.detailsText}>💧 Humidity: {sensorData.Humidity}%</Text>
          <Text style={styles.detailsText}>🌱 Soil Moisture: {sensorData.Soil_Moisture}</Text>
          <Text style={styles.detailsText}>🌊 Moisture Level: {sensorData.Moisture_1}</Text>
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
  detailsCard: {
    backgroundColor: "#E8F5E9",
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  detailsText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
});

