import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/SignUpScreen';
import LandingScreen from './Screens/LandingScreen';
import ContactsScreen from './Screens/ContactsScreen';
import SettingsScreen from './Screens/SettingsScreen';
import ChatScreen from './Screens/ChatScreen';
import { getContacts, addUserAsContact } from './API';
import AvailableContactsScreen from './Screens/AvailableContactsScreen';
import ContactDetails from './Screens/ContactDetails';
import BlockedUsersScreen from './Screens/BlockedUsersScreen';
import ProfileScreen from './Screens/ProfileScreen';
import UpdateInformationScreen from './Screens/UpdateInformationScreen';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="LandingScreen" component={LandingScreen} />
        <Stack.Screen name="ContactsScreen" component={ContactsScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="AvailableContactsScreen" component={AvailableContactsScreen} />
        <Stack.Screen name="ContactDetails" component={ContactDetails} />
        <Stack.Screen name="BlockedUsersScreen" component={BlockedUsersScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="UpdateInformationScreen" component={UpdateInformationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
