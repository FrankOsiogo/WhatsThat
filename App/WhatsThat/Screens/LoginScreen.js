import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Image, Text } from 'react-native';
import { loginUser } from '../API';
import { storeUserToken, storeUserId } from '../Utility/UserStorage';
import LogoImage from '../Images/logo.png';

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const loginResponse = await loginUser(email, password);
      if (loginResponse.token) {
        console.log(loginResponse.id);
        await storeUserToken(loginResponse.token);
        await storeUserId(loginResponse.id);
        navigation.navigate('LandingScreen');
        Alert.alert('Login Successful', 'You have been logged in successfully.');
      } else {
        Alert.alert('Login Failed', 'Failed to login. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={LogoImage} style={styles.logo} />
      <Text style={styles.logoText}>WhatsThat?</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
      />
      <Button title="Log in" onPress={handleLogin} />
      <Button title="New Here? Register" onPress={() => navigation.navigate('Register')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  logo: {
    width: '100%',
    height: 200, 
    resizeMode: 'contain',
  },
  logoText: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'sans-serif',
    color: '#8cccf4',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
});

export default LoginScreen;
