import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FontAwesome } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from "firebase/auth"; // Firebase Auth
import { auth } from '../firebaseConfig'; // Import Firebase auth from your config

export default function RegisterScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Firebase Signup Function
  const handleSignUp = () => {
    if (!fullName || !email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Successfully created a new user
        const user = userCredential.user;
        console.log("User created:", user);
        Alert.alert("Success", "Account created successfully!");
        navigation.navigate('Login'); // Navigate to the Login screen
      })
      .catch((error) => {
        console.error("Error signing up:", error.message);
        Alert.alert("Error", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Register</Text>
      <Text style={styles.subtitle}>Create your new account</Text>

      {/* Full Name Input */}
      <View style={styles.inputContainer}>
        <Icon name="person" size={20} color="#000" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
      </View>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Icon name="email" size={20} color="#000" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#000" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Remember Me and Forgot Password */}
      <View style={styles.rememberMeContainer}>
        <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
          <Icon
            name={rememberMe ? "check-box" : "check-box-outline-blank"}
            size={20}
            color="#256724"
          />
        </TouchableOpacity>
        <Text style={styles.rememberMeText}>Remember Me</Text>
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#256724',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d4e6d9',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  signUpButton: {
    backgroundColor: '#256724',
    borderRadius: 25,
    paddingVertical: 15,
    marginVertical: 20,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  rememberMeText: {
    color: '#256724',
    marginLeft: 5,
  },
  forgotPasswordText: {
    color: '#256724',
  },
  orText: {
    textAlign: 'center',
    color: '#aaa',
    marginVertical: 10,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialIcon: {
    marginHorizontal: 15,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    color: '#aaa',
  },
  loginText: {
    color: '#256724',
    marginLeft: 5,
    textDecorationLine: 'underline',
  },
});
