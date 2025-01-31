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
    id: "1",
    name: "Aloe Vera",
    image:
      "https://m.media-amazon.com/images/I/81XWpVvk5AL.AC_UF1000,1000_QL80.jpg",
  },
  {
    id: "2",
    name: "Peace Lily",
    image:
      "https://seed2plant.in/cdn/shop/files/SPR-variegated-peace-lily-domino-7097188-hero-A-422d7faa152d42d3a4030ff8a2a33768.jpg?v=1692362762",
  },
  {
    id: "3",
    name: "Snake Plant",
    image:
      "https://cdn.shopify.com/s/files/1/0013/3529/6118/products/Snake-Plant-2048px.jpg?v=1596544888",
  },
  {
    id: "4",
    name: "Money Plant",
    image:
      "https://5.imimg.com/data5/ND/LF/MY-25617832/natural-money-plant-500x500.jpg",
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
        <Text style={styles.greeting}>Hey Adwaith!</Text>
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
    paddingHorizontal: 20,
  },
  card: {
    flex: 1,
    margin: 10,
    height: 180, // Consistent height for all cards
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
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#333",
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