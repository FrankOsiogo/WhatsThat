import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { getChatDetails, removeUserFromChat } from '../API';

const RemoveUserScreen = ({ route, navigation }) => {
  const { chatId } = route.params;
  const [members, setMembers] = useState([]);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const chatDetails = await getChatDetails(chatId);
      setMembers(chatDetails.members);
    } catch (error) {
      console.log('Error loading chat members:', error);
    }
  };

  const handleRemoveUser = async (userId) => {
    try {
      await removeUserFromChat(chatId, userId);
      Alert.alert('Success', 'User removed from the chat.', [{ text: 'OK', onPress: () => navigation.goBack() }]);
    } catch (error) {
      console.log('Error removing user from chat:', error);
      Alert.alert('Error', 'Failed to remove user from the chat.');
    }
  };

  const renderMemberItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.memberItemContainer} onPress={() => handleRemoveUser(item.user_id)}>
        <Text style={styles.memberItemText}>{item.first_name} {item.last_name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={members}
        renderItem={renderMemberItem}
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
  memberItemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  memberItemText: {
    fontSize: 16,
  },
});

export default RemoveUserScreen;
