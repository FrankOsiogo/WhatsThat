import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/SignUpScreen';
import LandingScreen from './Screens/LandingScreen';
import ContactsScreen from './Screens/ContactsScreen';
import SettingsScreen from './Screens/SettingsScreen';
import ChatScreen from './Screens/ChatScreen';
import AvailableContactsScreen from './Screens/AvailableContactsScreen';
import ContactDetails from './Screens/ContactDetails';
import BlockedUsersScreen from './Screens/BlockedUsersScreen';
import ProfileScreen from './Screens/ProfileScreen';
import ChatMessagesScreen from './Screens/ChatMessageScreen';
import AddUserScreen from './Screens/AddUserScreen';
import RemoveUserScreen from './Screens/RemoveUserScreen';
import UpdateChatNameScreen from './Screens/UpdateChatNameScreen';
import UploadPictureScreen from './Screens/UploadPictureScreen';
import ChatDetailsScreen from './Screens/ChatDetailsScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="LandingScreen" component={LandingScreen} 
        options={{
          headerLeft: null,
          headerBackTitleVisible: false,
          gestureEnabled: false,
         }} />
        <Stack.Screen name="ContactsScreen" component={ContactsScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen
          name="AvailableContactsScreen"
          component={AvailableContactsScreen}
        />
        <Stack.Screen name="ContactDetails" component={ContactDetails} />
        <Stack.Screen name="BlockedUsersScreen" component={BlockedUsersScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="ChatMessages" component={ChatMessagesScreen} />
        <Stack.Screen name="AddUser" component={AddUserScreen} />
        <Stack.Screen name="RemoveUser" component={RemoveUserScreen} />
        <Stack.Screen name="UpdateChatName" component={UpdateChatNameScreen} />
        <Stack.Screen name="UploadPictureScreen" component={UploadPictureScreen} />
        <Stack.Screen name="ChatDetails" component={ChatDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
