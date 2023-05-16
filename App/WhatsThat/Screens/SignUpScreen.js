import React, { useState } from 'react';
import { SafeAreaView, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { register } from '../API';
import { Text } from 'react-native';

function RegisterScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await register(firstName, lastName, email, password);
      Alert.alert('Registration Successful', 'You have been registered successfully.');
      navigation.navigate('LoginScreen'); // Navigate to the login screen
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Registration Failed', 'Failed to register. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        onChangeText={setFirstName}
        value={firstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        onChangeText={setLastName}
        value={lastName}
      />
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
      <Button title="Register" onPress={handleRegister} />
      <Text style={styles.additionalText}>
        Email must be valid and password must be strong (greater than 8 characters including one uppercase, one number, and one special character).
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  additionalText: {
    marginTop: 16,
    textAlign: 'center',
    color: 'gray',
  },
});

export default RegisterScreen;
