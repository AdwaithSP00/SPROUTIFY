import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Background Image */}
      <ImageBackground source={require('../images/bg.png')} style={styles.backgroundImage}>
        
        {/* Main Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.loginPrompt}>Login to your account</Text>

          {/* Full Name Input */}
          <View style={styles.inputContainer}>
            <Image source={require('../images/Vector.png')} style={styles.icon} />
            <TextInput
              placeholder="Full Name"
              placeholderTextColor="#8e8e8e"
              style={styles.input}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Image source={require('../images/lock.png')} style={styles.icon} />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#8e8e8e"
              secureTextEntry={true}
              style={styles.input}
            />
            {/* Show Password Icon (placeholder) */}
            <TouchableOpacity>
              <Image source={require('../images/pass.png')} style={styles.icon} />
            </TouchableOpacity>
          </View>

          {/* Remember Me and Forgot Password Section */}
          <View style={styles.rememberMeContainer}>
            
            <Text style={styles.rememberMeText}>Remember Me</Text>
            <TouchableOpacity onPress={() => alert('Forgot Password')}>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupPrompt}>Don’t have an account?</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
              <Text style={styles.signupText}> Sign up</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  contentContainer: {
    paddingHorizontal: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    marginHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#256724',
    textAlign: 'center',
  },
  loginPrompt: {
    fontSize: 14,
    color: '#256724',
    textAlign: 'center',
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#40893F4D',
    borderRadius: 8,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  icon: {
    width: 15,
    height: 15,
    tintColor: '#256724',
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#333',
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  checkIcon: {
    width: 20,
    height: 20,
    tintColor: '#256724',
  },
  rememberMeText: {
    fontSize: 14,
    color: '#256724',
    marginLeft: 5,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#256724',
    
  },
  loginButton: {
    backgroundColor: '#256724',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupPrompt: {
    fontSize: 14,
    color: '#8e8e8e',
  },
  signupText: {
    fontSize: 14,
    color: '#256724',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
