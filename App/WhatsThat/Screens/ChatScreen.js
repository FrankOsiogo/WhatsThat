import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, TouchableOpacity, Modal, StyleSheet, Pressable } from 'react-native';
import { createConversation, getChats, getChatDetails } from '../API';


const ChatScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);


  useEffect(() => {
    const interval = setInterval(loadChats, 2000);
    return () => {
      clearInterval(interval);
    };
    loadChats();
  }, []);

  const loadChats = async () => {
    try {
      const chatList = await getChats();
      setChats(chatList);
    } catch (error) {
      console.log('Error loading chats:', error);
    }
  };

  const handleNewConversation = async () => {
    try {
      const newConversation = await createConversation('New Conversation');
      console.log('New conversation created:', newConversation);
      loadChats(); // Update the chat list after creating a new conversation
    } catch (error) {
      console.log('Error creating conversation:', error);
    }
  };


  const handleChatLongPress = (chatId) => {
    setSelectedChatId(chatId);
    setModalVisible(true);
  };

  const handleAddUserButtonPress = () => {
    navigation.navigate('AddUser', { chatId: selectedChatId });
    setModalVisible(false);
  };

  const handleRemoveUserButtonPress = () => {
    navigation.navigate('RemoveUser', { chatId: selectedChatId });
    setModalVisible(false);
  };

  const handleViewChatDetailsButtonPress = async () => {
    try {
      navigation.navigate('ChatDetails', { chatId: selectedChatId });
      setModalVisible(false);
    } catch (error) {
      console.log('Error retrieving chat details:', error);
    }
  };

  const handleUpdateChatNameButtonPress = () => {
    navigation.navigate('UpdateChatName', { chatId: selectedChatId });
    setModalVisible(false);
  };

  const renderChatItem = ({ item }) => {
    const handleChatPress = () => {
      navigation.navigate('ChatMessages', { chatId: item.chat_id });
    };

    return (
      <TouchableOpacity
        style={styles.chatItemContainer}
        onPress={handleChatPress}
        onLongPress={() => handleChatLongPress(item.chat_id)}
      >
        <Text style={styles.chatItemText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.newConversationButton} onPress={handleNewConversation}>
        <Text style={styles.newConversationButtonText}>Create New Conversation + </Text>
      </TouchableOpacity>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.chat_id.toString()}
        renderItem={renderChatItem}
      />
     <Modal
  visible={modalVisible}
  transparent={true}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Pressable style={styles.modalButton} onPress={handleAddUserButtonPress}>
        <Text>Add User</Text>
      </Pressable>
      <Pressable style={styles.modalButton} onPress={handleRemoveUserButtonPress}>
        <Text>Remove User</Text>
      </Pressable>
      <Pressable style={styles.modalButton} onPress={handleUpdateChatNameButtonPress}>
        <Text>Update Chat Name</Text>
      </Pressable>
      <Pressable style={styles.modalButton} onPress={handleViewChatDetailsButtonPress}>
        <Text>View Chat Details</Text>
      </Pressable>
      <Pressable style={styles.modalButton} onPress={() => setModalVisible(false)}>
        <Text>Cancel</Text>
      </Pressable>
    </View>
  </View>
</Modal>
</View>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
},
chatItemContainer: {
padding: 16,
borderBottomWidth: 1,
borderBottomColor: '#ccc',
},
chatItemText: {
fontSize: 18,
},
modalContainer: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalContent: {
backgroundColor: '#fff',
padding: 20,
borderRadius: 10,
},
modalButton: {
paddingVertical: 10,
borderBottomWidth: 1,
borderBottomColor: '#349cf4',
},
newConversationButton: {
backgroundColor: '#2c94f8',
padding: 16,
marginBottom: 10,
alignItems: 'center',
},
newConversationButtonText: {
fontSize: 16,
fontWeight: 'bold',
color: '#fff',
},
});

export default ChatScreen;