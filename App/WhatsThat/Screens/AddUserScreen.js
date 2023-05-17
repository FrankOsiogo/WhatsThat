import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { getContacts, addUserToChat } from '../API';



const AddUserScreen = ({ route, navigation }) => {
  const { chatId } = route.params;
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const contactList = await getContacts();
      setContacts(contactList);
    } catch (error) {
      console.log('Error loading contacts:', error);
    }
  };

  const handleAddUser = async (userId) => {
    try {
      await addUserToChat(chatId, userId);
      Alert.alert('Success', 'User added to the chat.', [{ text: 'OK', onPress: () => navigation.goBack() }]);
    } catch (error) {
      console.log('Error adding user to chat:', error);
      Alert.alert('Error', 'Failed to add user to the chat.');
    }
  };

  const renderContactItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.contactItemContainer} onPress={() => handleAddUser(item.user_id)}>
        <Text style={styles.contactItemText}>{item.first_name} {item.last_name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={renderContactItem}
        keyExtractor={(item) => item.user_id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  contactItemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactItemText: {
    fontSize: 16,
  },
});

export default AddUserScreen;
