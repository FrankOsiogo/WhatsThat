import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { getBlockedUsers, unblockUser } from '../API';

const BlockedUsersScreen = () => {
  const [blockedUsers, setBlockedUsers] = useState([]);

  useEffect(() => {
    fetchBlockedUsers();
  }, []);

  const fetchBlockedUsers = async () => {
    try {
      const response = await getBlockedUsers();
      setBlockedUsers(response);
    } catch (error) {
      console.log(error);
    }
  };

  const unblockContact = async (userId) => {
    try {
      await unblockUser(userId);
      fetchBlockedUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const renderBlockedUserItem = ({ item }) => (
    <View style={styles.blockedUserItem}>
      <Text>{item.first_name} {item.last_name}</Text>
      <TouchableOpacity onPress={() => unblockContact(item.user_id)}>
        <Text style={styles.unblockButton}>Unblock</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={blockedUsers}
        renderItem={renderBlockedUserItem}
        keyExtractor={(item) => item.user_id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blockedUserItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  unblockButton: {
    color: 'green',
  },
});

export default BlockedUsersScreen;
