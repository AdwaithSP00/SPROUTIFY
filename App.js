import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg' }} // Replace with the actual background image URL
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Sproutify</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Create an account</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Dark overlay for readability
    width: '100%',
    paddingVertical: 50, // Adds spacing at the top and bottom
  },
  title: {
    fontSize: 36,
    color: 'white',
    marginTop: 50, // Moves the title a bit higher
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 30, // Moves the buttons to the bottom with some spacing
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
