import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getChatDetails } from '../API';


const ChatDetailsScreen = ({ route }) => {
  const { chatId } = route.params;
  const [chatDetails, setChatDetails] = useState(null);

  useEffect(() => {
    loadChatDetails();
  }, []);

  const loadChatDetails = async () => {
    try {
      const details = await getChatDetails(chatId);
      setChatDetails(details);
    } catch (error) {
      console.log('Error loading chat details:', error);
    }
  };

  if (!chatDetails) {
    return (
      <View style={styles.container}>
        <Text>Currently Loading chat details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat Details</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Chat ID:</Text>
        <Text style={styles.value}>{chatId}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Chat Name:</Text>
        <Text style={styles.value}>{chatDetails.name}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Creator:</Text>
        <Text style={styles.value}>
          {chatDetails.creator.first_name} {chatDetails.creator.last_name}
        </Text>
      </View>
      <Text style={styles.sectionTitle}>Members:</Text>
      {chatDetails.members.map((member) => (
        <View key={member.user_id} style={styles.memberContainer}>
          <Text>{member.first_name} {member.last_name}</Text>
          <Text style={styles.email}>{member.email}</Text>
        </View>
      ))}
      <Text style={styles.sectionTitle}>Messages:</Text>
      {chatDetails.messages.map((message) => (
        <View key={message.message_id} style={styles.messageContainer}>
          <Text style={styles.messageAuthor}>{message.author.first_name} {message.author.last_name}:</Text>
          <Text>{message.message}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  value: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  memberContainer: {
    marginBottom: 8,
  },
  email: {
    color: '#888',
  },
  messageContainer: {
    marginBottom: 8,
  },
  messageAuthor: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default ChatDetailsScreen;
