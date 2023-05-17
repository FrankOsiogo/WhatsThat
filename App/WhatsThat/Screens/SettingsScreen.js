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
    navigation.navigate('ProfileScreen');
  };

  const handleLogout = () => {
    navigation.navigate('LoginScreen');
  };

  const handleUploadProfilePicture = () => {
    navigation.navigate('UploadPictureScreen');
  };

  const handleViewBlockedUsers = () => {
    navigation.navigate('BlockedUsersScreen', { blockedUsers });
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="View My Profile"
          onPress={handleViewProfile}
          color="#007AFF"
        />
      </View>

      

      <View style={styles.buttonContainer}>
        <Button
          title="Upload A Profile Picture"
          onPress={handleUploadProfilePicture}
          color="#FF9500"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="View Blocked Users"
          onPress={handleViewBlockedUsers}
          color="#5856D6"
        />
      </View>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Logout"
          onPress={handleLogout}
          color="#FF3B30"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: 200,
    height: 50,
    marginBottom: 20,
  },
});


export default SettingsScreen;