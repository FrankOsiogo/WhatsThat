import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { getBlockedUsers } from '../API';

const SettingsScreen = ({ navigation }) => {
  const [blockedUsers, setBlockedUsers] = useState([]);

  useEffect(() => {
    fetchBlockedUsers();
  }, []);

  const fetchBlockedUsers = () => {
    getBlockedUsers()
      .then((data) => {
        setBlockedUsers(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleViewProfile = () => {
    // Logic to handle view profile
    // For example, you can navigate to the profile screen
    navigation.navigate('ProfileScreen');
  };

  const handleLogout = () => {
    // Logic to handle logout
    // For example, you can clear the user session and navigate to the login screen
    navigation.navigate('LoginScreen');
  };

  const handleUpdateInformation = () => {
    // Logic to handle update information
    // For example, you can navigate to the update information screen
    navigation.navigate('UpdateInformationScreen');
  };

  const handleViewBlockedUsers = () => {
    // Logic to handle view blocked users
    // Navigate to the BlockedUsersScreen and pass the blocked users as a parameter
    navigation.navigate('BlockedUsersScreen', { blockedUsers });
  };

  return (
    <View style={styles.container}>
      <Button title="View My Profile" onPress={handleViewProfile} />
      <Button title="Logout" onPress={handleLogout} />
      <Button title="Update My Information" onPress={handleUpdateInformation} />
      <Button title="View Blocked Users" onPress={handleViewBlockedUsers} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SettingsScreen;