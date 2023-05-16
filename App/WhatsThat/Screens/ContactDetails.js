import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { removeUserFromContacts, blockUser } from '../API';

const ContactDetailsScreen = ({ route }) => {
  const { contact } = route.params;

  const handleRemoveContact = () => {
    removeUserFromContacts(contact.user_id)
      .then(() => {
        console.log('Contact removed successfully');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleBlockContact = () => {
    blockUser(contact.user_id)
      .then(() => {
        console.log('Contact blocked successfully');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>ID:</Text>
      <Text style={styles.value}>{contact.user_id}</Text>

      <Text style={styles.label}>First Name:</Text>
      <Text style={styles.value}>{contact.first_name}</Text>

      <Text style={styles.label}>Last Name:</Text>
      <Text style={styles.value}>{contact.last_name}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{contact.email}</Text>

      <TouchableOpacity style={styles.removeButton} onPress={handleRemoveContact}>
        <Text style={styles.removeButtonText}>Remove Contact</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.blockButton} onPress={handleBlockContact}>
        <Text style={styles.blockButtonText}>Block Contact</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 15,
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  blockButton: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  blockButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ContactDetailsScreen;
