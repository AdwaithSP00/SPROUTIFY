import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";
import BottomNavBar from "./BottomNavBar";
import { auth } from "../firebaseConfig";
import { getDatabase, ref, get } from "firebase/database";

const { width } = Dimensions.get("window");

// Sample plant data
const plants = [
  {
    id: "4",
    name: "Money Plant",
    image:
      "https://www.trustbasket.com/cdn/shop/articles/Money_plant.webp?v=1679918387",
  },
  {
    id: "5",
    name: "Water Lily",
    image: "https://m.media-amazon.com/images/I/51sRsttNlvL._SX679_.jpg",
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
  const [firstName, setFirstName] = useState("User"); // Default value

  // Fetch user's first name from Firebase
  useEffect(() => {
    const fetchUserName = async () => {
      const user = auth.currentUser;
      if (user) {
        const db = getDatabase();
        const userRef = ref(db, `users/${user.uid}`); // Fetch data using UID

        try {
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            const fullName = snapshot.val().fullName || "User";
            setFirstName(fullName.split(" ")[0]); // Extract first name
          } else {
            setFirstName("User"); // Default if name not found
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setFirstName("User");
        }
      }
    };

    fetchUserName();
  }, []);

  // Filter plants based on search text
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hey {firstName}</Text>
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
        numColumns={1}
        renderItem={({ item }) => (
          <PlantCard
            plant={item}
            onPress={() => navigation.navigate("Page5", { plant: item })}
          />
        )}
        contentContainerStyle={styles.list}
      />

      <BottomNavBar navigation={navigation} />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    marginTop: 50,
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
    paddingBottom: 60,
  },
  card: {
    width: width - 30,
    height: 200,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginVertical: 8,
    alignSelf: "center",
  },
  image: {
    width: "90%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
  },
});
