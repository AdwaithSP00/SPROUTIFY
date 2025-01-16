import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebaseConfig'; // Import Firebase auth
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Page4 from './screens/page4';
import Page5 from './screens/page5';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); // Set true if user is logged in, false otherwise
    });

    return unsubscribe; // Clean up the listener when the component unmounts
  }, []);

  if (isLoggedIn === null) {
    // Show a loading screen while determining login status
    return null; // Replace with a loading spinner if needed
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* HomeScreen will always be the first page */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        {isLoggedIn ? (
          // User is logged in, show logged-in screens
          <>
            <Stack.Screen
              name="Page4"
              component={Page4}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Page5"
              component={Page5}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          // User is not logged in, show login/signup screens
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
