import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { updateChat } from '../API';

const UpdateChatNameScreen = ({ route, navigation }) => {
  const { chatId } = route.params;
  const [newChatName, setNewChatName] = useState('');

  const handleUpdateChatName = async () => {
    try {
      const chatData = { name: newChatName };
      await updateChat(chatId, chatData);
      navigation.goBack(); // Navigate back to the ChatScreen after updating the chat name
    } catch (error) {
      console.log('Error updating chat name:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Chat Name</Text>
      <TextInput
        style={styles.input}
        placeholder="New Chat Name"
        value={newChatName}
        onChangeText={setNewChatName}
      />
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateChatName}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  updateButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default UpdateChatNameScreen;