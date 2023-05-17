import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, StyleSheet } from 'react-native';
import { searchUsers, searchAllUsers, addUserAsContact } from '../API';

const AvailableContactsScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      fetchUsers();
    }, 300);

    return () => {
      clearTimeout(delaySearch);
    };
  }, [searchTerm]);

  const fetchUsers = () => {
    if (searchTerm === '') {
      searchAllUsers()
        .then((data) => {
          setUsers(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      searchUsers(searchTerm)
        .then((data) => {
          setUsers(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleAddContact = (user_id) => {
    addUserAsContact(user_id)
      .then(() => {
        console.log('Contact added successfully');
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.userItem} onPress={() => handleAddContact(item.user_id)}>
      <Text style={styles.userName}>{item.first_name} {item.last_name}</Text>
      <Text style={styles.userEmail}>{item.email}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        onChangeText={setSearchTerm}
        value={searchTerm}
        placeholder="Search users"
      />
      <FlatList
        data={users}
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
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  userItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    color: 'gray',
  },
});

export default AvailableContactsScreen;
