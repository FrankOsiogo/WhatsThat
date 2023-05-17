import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { getUserById, updateUser } from '../API';
import { getUserId, saveUserId } from '../Utility/UserStorage';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const fetchUserDetails = async () => {
    try {
      const userId = await getUserId();
      const userDetails = await getUserById(userId);
      setUser(userDetails);
      setFirstName(userDetails.first_name);
      setLastName(userDetails.last_name);
      setEmail(userDetails.email);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleChangeDetails = async () => {
    try {
      const updatedUser = {
        first_name: firstName,
        last_name: lastName,
        email: email,
      };

      const userId = await getUserId();
      await updateUser(userId, updatedUser);

      // Update the stored user ID if email was changed
      if (email !== user.email) {
        await storeUserId(email);
      }

      Alert.alert('Success', 'User details updated successfully.');

      // Fetch updated user details after successful update
      await fetchUserDetails();
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to update user details.');
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      {user ? (
        <View>
        <Text style={styles.editInfoText}>
        Edit your information, then click "Update My Information" to save changes
        </Text>
          <Text>First Name:</Text>
          <TextInput
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Enter First Name"
          />

          <Text>Last Name:</Text>
          <TextInput
            value={lastName}
            onChangeText={setLastName}
            placeholder="Enter Last Name"
          />

          <Text>Email:</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter Email"
          />

          <Button title="Update My Information" onPress={handleChangeDetails} />
        </View>
      ) : (
        <Text>No user found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    editInfoText: {
      marginTop: 10,
      marginBottom: 10,
      fontSize: 16,
      fontWeight: 'bold',
    },
});
export default ProfileScreen;

