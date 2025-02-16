import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { getDatabase, ref, onValue } from "firebase/database";
import { MaterialIcons } from "@expo/vector-icons"; // Importing for delete icon
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
        console.log("Fetched data:", sensorData);

        const newNotifications = [];

        // Function to get only hour and seconds
        const getFormattedTime = () => {
          const now = new Date();
          return `${now.getHours()}:${now.getSeconds()}`;
        };

        if (sensorData.Moisture_1 < 76) {
          const plant = plants.find((p) => p.name === "Water Lily");
          if (plant) {
            newNotifications.push({
              id: plant.id,
              plant: { ...plant },
              message: `⚠️ ${plant.name} - Soil moisture is low, pump activated.`,
              timestamp: getFormattedTime(), // Only hour:seconds
            });
          }
        }

        if (sensorData.Soil_Moisture < 76) {
          const plant = plants.find((p) => p.name === "Money Plant");
          if (plant) {
            newNotifications.push({
              id: plant.id,
              plant: { ...plant },
              message: `⚠️ ${plant.name} - Soil moisture is low, pump activated.`,
              timestamp: getFormattedTime(), // Only hour:seconds
            });
          }
        }

        console.log("Generated notifications:", newNotifications);
        setNotifications(newNotifications);
      } else {
        console.log("No data found in Firebase.");
        setNotifications([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Function to delete a notification
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
              {/* Red Cross Delete Button */}
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteNotification(notification.id)}
              >
                <MaterialIcons name="close" size={20} color="red" />
              </TouchableOpacity>

              {/* Notification Text */}
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Page5", { plant: notification.plant })
                }
              >
                <Text style={styles.notificationText}>{notification.message}</Text>
              </TouchableOpacity>

              {/* Timestamp at bottom right */}
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
    marginBottom: 60, // Space for bottom navigation
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
