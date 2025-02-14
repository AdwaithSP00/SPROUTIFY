import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import BottomNavBar from "./BottomNavBar"; // Import BottomNavBar component

const plants = [
  {
    id: "4",
    name: "Money Plant",
    image:
      "https://www.trustbasket.com/cdn/shop/articles/Money_plant.webp?v=1679918387",
  },
];

const PlantCard = ({ plant, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image source={{ uri: plant.image }} style={styles.image} />
    <Text style={styles.text}>{plant.name}</Text>
  </TouchableOpacity>
);

export default function PlantListScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hey</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Search plants..."
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>

      <FlatList
        data={filteredPlants}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <PlantCard
            plant={item}
            onPress={() => navigation.navigate("Page5", { plant: item })}
          />
        )}
        contentContainerStyle={styles.list}
      />

      {/* Common Bottom Navigation */}
      <BottomNavBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    marginTop: 50, // Top margin for spacing
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 5,
  },
  searchBar: {
    height: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  list: {
    paddingHorizontal: 15,
  },
  card: {
    flex: 1,
    margin: 6,
    height: 120, // 🔹 Reduced height even more
    width: 130,  // 🔹 Added fixed width for better control
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  image: {
    width: 80,   // 🔹 Adjusted for better fit
    height: 80,  // 🔹 Adjusted for better fit
    resizeMode: "cover",
    borderRadius: 8,
  },
  text: {
    fontSize: 14,
    color: "#333",
    marginTop: 4, // 🔹 Reduced space between image & text
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
