import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getContacts, addUserAsContact } from '../API';

const ContactsScreen = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = () => {
    getContacts()
      .then((data) => {
        setContacts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchContacts();
    }, [])
  );

  const handleAddContact = () => {
    navigation.navigate('AvailableContactsScreen');
  };

  const handleUserPress = (contact) => {
    navigation.navigate('ContactDetails', { contact });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.contactItem} onPress={() => handleUserPress(item)}>
      <Text style={styles.contactName}>{item.first_name} {item.last_name}</Text>
      <Text style={styles.contactEmail}>{item.email}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={handleAddContact}>
        <Text style={styles.addButtonText}>Add Contact</Text>
      </TouchableOpacity>
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.user_id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    color: 'gray',
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#64b5f6',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactEmail: {
    fontSize: 14,
    color: 'gray',
  },
});

export default ContactsScreen;
