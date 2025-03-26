import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from "react-native";
import { getDatabase, ref, onValue } from "firebase/database";
import { PieChart } from "react-native-chart-kit";
import BottomNavBar from "./BottomNavBar"; // Bottom Navigation Component

export default function PlantDetailsScreen({ route, navigation }) {
  const { plant } = route.params;
  const [sensorData, setSensorData] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const sensorRef = ref(db, "sensors"); // Firebase path

    const unsubscribe = onValue(sensorRef, (snapshot) => {
      if (snapshot.exists()) {
        setSensorData(snapshot.val());
      }
    }, (error) => console.error("Firebase error: ", error));

    return () => unsubscribe();
  }, []);

  if (!sensorData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading sensor data...</Text>
      </View>
    );
  }

  // Select correct data based on the plant
  const plantData =
    plant.name === "Water Lily" ? sensorData?.waterLily : sensorData?.moneyPlant;

  const npkData = [
    { name: "Nitrogen", value: sensorData.Nitrogen, color: "#7B1FA2" },
    { name: "Phosphorus", value: sensorData.Phosphorus, color: "#388E3C" },
    { name: "Potassium", value: sensorData.Potassium, color: "#1976D2" },
  ].filter((item) => item.value > 0); // Remove zero values for better visualization

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Plant Image */}
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
              <Text style={styles.sensorValue}>{plantData.temperature}°C</Text>
            </View>
            <View style={styles.sensorBox}>
              <Text style={styles.sensorLabel}>💧 Humidity</Text>
              <Text style={styles.sensorValue}>{plantData.humidity}%</Text>
            </View>
          </View>
          <View style={styles.sensorRow}>
            <View style={styles.sensorBox}>
              <Text style={styles.sensorLabel}>🌱 Soil Moisture</Text>
              <Text style={styles.sensorValue}>{plantData.moisture}</Text>
            </View>
          </View>
        </View>

        {/* NPK Chart Section */}
        {npkData.length > 0 && (
          <View style={styles.npkCard}>
            <Text style={styles.sectionTitle}>🧪 NPK Levels</Text>
            <PieChart
              data={npkData}
              width={Dimensions.get("window").width - 40}
              height={200}
              chartConfig={{
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor={"value"}
              backgroundColor={"transparent"}
              paddingLeft={"15"}
              center={[10, 10]}
              absolute
            />
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavBar navigation={navigation} />
    </View>
  );
}

// Styles
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
    padding: 15,
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  plantImage: {
    width: 150,
    height: 180,
    resizeMode: "contain",
  },
  plantName: {
    fontSize: 22,
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
  npkCard: {
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
  },
});