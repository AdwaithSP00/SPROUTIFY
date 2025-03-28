import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { getDatabase, ref, onValue } from "firebase/database";
import { MaterialIcons } from "@expo/vector-icons";
import BottomNavBar from "./BottomNavBar";

const plants = [
  {
    id: "4",
    name: "Money Plant",
    image: "https://www.trustbasket.com/cdn/shop/articles/Money_plant.webp?v=1679918387",
  },
  {
    id: "5",
    name: "Water Lily",
    image: "https://m.media-amazon.com/images/I/51sRsttNLvL.jpg",
  },
];

export default function NotificationsScreen({ navigation }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const sensorRef = ref(db, "sensors");

    const unsubscribe = onValue(sensorRef, (snapshot) => {
      if (snapshot.exists()) {
        const sensorData = snapshot.val();
        console.log("Fetched data from Firebase:", JSON.stringify(sensorData, null, 2));

        const newNotifications = [];
        const getFormattedTime = () => {
          const now = new Date();
          return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
        };

        // 🟢 Moisture Alerts for Water Lily & Money Plant
        if (sensorData?.waterLily?.moisture !== undefined && sensorData.waterLily.moisture < 40) {
          const plant = plants.find((p) => p.name === "Water Lily");
          if (plant) {
            newNotifications.push({
              id: `${plant.id}-${getFormattedTime()}`,
              plant: { ...plant },
              message: `⚠️ ${plant.name} - Soil moisture is low, pump activated.`,
              timestamp: getFormattedTime(),
            });
          }
        }

        if (sensorData?.moneyPlant?.moisture !== undefined && sensorData.moneyPlant.moisture < 40) {
          const plant = plants.find((p) => p.name === "Money Plant");
          if (plant) {
            newNotifications.push({
              id: `${plant.id}-${getFormattedTime()}`,
              plant: { ...plant },
              message: `⚠️ ${plant.name} - Soil moisture is low, pump activated.`,
              timestamp: getFormattedTime(),
            });
          }
        }

        // 🔴 Check if ANY nutrient is low
        const isNutrientLow =
          (sensorData?.Nitrogen !== undefined && sensorData.Nitrogen < 40) ||
          (sensorData?.Phosphorus !== undefined && sensorData.Phosphorus < 40) ||
          (sensorData?.Potassium !== undefined && sensorData.Potassium < 40);

        if (isNutrientLow) {
          newNotifications.push({
            id: `Nutrient-${getFormattedTime()}`,
            message: "⚠️ Nutrient levels are low, pump activated.",
            timestamp: getFormattedTime(),
          });
        }

        console.log("Generated notifications:", newNotifications);
        setNotifications(newNotifications);
      } else {
        console.log("No sensor data found in Firebase.");
        setNotifications([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const deleteNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🔔 Notifications</Text>
      <ScrollView style={styles.scrollView}>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <View key={notification.id} style={styles.notificationCard}>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteNotification(notification.id)}
              >
                <MaterialIcons name="close" size={20} color="red" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  notification.plant
                    ? navigation.navigate("Page5", { plant: notification.plant })
                    : null
                }
              >
                <Text style={styles.notificationText}>{notification.message}</Text>
              </TouchableOpacity>

              <Text style={styles.timestamp}>{notification.timestamp}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noNotifications}>✅ No alerts currently</Text>
        )}
      </ScrollView>
      <BottomNavBar navigation={navigation} />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
    marginBottom: 60,
  },
  notificationCard: {
    backgroundColor: "#FFF3E0",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    position: "relative",
  },
  deleteButton: {
    position: "absolute",
    top: 5,
    right: 5,
    padding: 5,
  },
  notificationText: {
    fontSize: 16,
    color: "#333",
  },
  timestamp: {
    fontSize: 12,
    color: "#777",
    textAlign: "right",
    marginTop: 5,
  },
  noNotifications: {
    textAlign: "center",
    fontSize: 16,
    color: "#777",
    marginTop: 20,
  },
});
