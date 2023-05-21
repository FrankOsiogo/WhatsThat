import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { getChatDetails, addMessageToChat, updateMessageInChat, deleteMessageFromChat } from '../API';
import { getUserId } from '../Utility/UserStorage';

const ChatMessagesScreen = ({ route }) => {
  const { chatId } = route.params;
  const [chatDetails, setChatDetails] = useState([]);
  const [message, setMessage] = useState('');
  const [editingData, setEditingData] = useState(null);

  useEffect(() => {
    const interval = setInterval(loadChatDetails, 1000);
    return () => clearInterval(interval); 
  }, []);

  const loadChatDetails = async () => {
    try {
      const userId = await getUserId();
      const chatData = await getChatDetails(chatId);
      const formattedChatData = chatData.messages.map((message) => {
        const isMe = Number(message.author.user_id) === Number(userId);
        return {
          id: message.message_id,
          text: message.message,
          author: isMe ? 'me' : 'other',
        };
      });
      setChatDetails([...formattedChatData]);
    } catch (error) {
      console.log('Error loading chat details:', error);
    }
  };
  

  const handleEditMessage = async (messageId, updatedMessage) => {
    try {
      await updateMessageInChat(chatId, messageId, updatedMessage);
    } catch (error) {
      console.log('Error editing message:', error);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await deleteMessageFromChat(chatId, messageId);
    } catch (error) {
      console.log('Error deleting message:', error);
    }
  };

  const handleSend = async () => {
    if (editingData) {
      try {
        await updateMessageInChat(chatId, editingData.id, message);
        setMessage('');
        setEditingData(null);
      } catch (error) {
        console.log('Error sending message:', error);
      }
    } else {
      try {
        await addMessageToChat(chatId, message);
        setMessage('');
      } catch (error) {
        console.log('Error sending message:', error);
      }
    }
  };

  const handleChatLongPress = (message) => {
    setEditingData(message);
    setMessage(message.text);
  };

  const renderMessageItem = ({ item }) => {
    const messageContainerStyle =
      item.author === 'me'
        ? [styles.messageItem, styles.messageItemMe]
        : [styles.messageItem, styles.messageItemOther];
    const messageTextStyle =
      item.author === 'me' ? styles.messageTextMe : styles.messageTextOther;
  
    const messageAlignStyle =
      item.author === 'me' ? styles.alignRight : styles.alignLeft;
  
    const showDeleteButton = item.author === 'me'; //Only shown on the user's own messages.
  
    return (
      <View style={[styles.messageContainer, messageAlignStyle]}>
        {showDeleteButton && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteMessage(item.id)}
          >
            <Text style={styles.deleteButtonText}>x</Text>
          </TouchableOpacity>
        )}
        <View style={messageContainerStyle}>
          <Text style={messageTextStyle}>{item.text}</Text>
        </View>
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      <FlatList
        data={chatDetails}
        renderItem={renderMessageItem}
        keyExtractor={(item) => item.id.toString()}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Enter
your message"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text>{editingData ? 'Edit' : 'Send'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 10,
    paddingHorizontal: 10,
  },
  sendButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'blue',
    borderRadius: 4,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageItem: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 4,
  },
  messageItemMe: {
    backgroundColor: 'blue',
  },
  messageItemOther: {
    backgroundColor: '#90EE90',
  },
  messageTextMe: {
    color: 'white',
  },
  messageTextOther: {
    color: 'black',
  },
  alignRight: {
    alignSelf: 'flex-end',
  },
  alignLeft: {
    alignSelf: 'flex-start',
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginRight: 5,
  },
  deleteButtonText: {
    color: 'white',
  },
});
export default ChatMessagesScreen;