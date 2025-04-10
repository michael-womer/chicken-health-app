import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  // Handle form submission
  const handleLogin = () => {
    // Basic validation
    if (!username || !password) {
      Alert.alert('Validation Error', 'Please enter both username and password.');
      return;
    }

    // Set loading state while processing
    setIsLoading(true);

    // Simulate login process (Replace with your authentication logic)
    setTimeout(() => {
      setIsLoading(false);
      
      // For now, just navigate to HomeScreen after successful login
      // Replace this with actual authentication logic
      if (username === 'admin' && password === 'password') {
        Alert.alert('Login Successful', 'Welcome to HealthyHen App!');
        navigation.navigate('HomeScreen');  // Navigate to HomeScreen after successful login
      } else {
        Alert.alert('Login Failed', 'Invalid username or password.');
      }
    }, 2000);  // Simulate network delay
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to PoultryHealthApp</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />

      <Button
        title={isLoading ? 'Logging in...' : 'Login'}
        onPress={handleLogin}
        disabled={isLoading}
      />

      <TouchableOpacity
        style={styles.signupLink}
        onPress={() => navigation.navigate('SignupScreen')}  // Navigate to Signup screen
      >
        <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2a9d8f',
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  signupLink: {
    marginTop: 20,
  },
  signupText: {
    fontSize: 16,
    color: '#2a9d8f',
  },
});

export default LoginScreen;