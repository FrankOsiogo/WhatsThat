// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import ContactsScreen from './ContactsScreen';
// import SettingsScreen from './SettingsScreen';
// import ChatScreen from './ChatScreen';

// const Tab = createBottomTabNavigator();

// const LandingScreen = () => {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Chat" component={ChatScreen} />
//       <Tab.Screen name="Contacts" component={ContactsScreen} />
//       <Tab.Screen name="Settings" component={SettingsScreen} />
//     </Tab.Navigator>
//   );
// };

// LandingScreen.options = {
//   headerTitle: 'WhatsThat?',
// };

// export default LandingScreen;
// LandingScreen.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ContactsScreen from './ContactsScreen';
import SettingsScreen from './SettingsScreen';
import ChatScreen from './ChatScreen';

const Tab = createBottomTabNavigator();

const LandingScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Contacts" component={ContactsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

LandingScreen.options = {
  headerLeft: null, // Remove the back arrow
  headerTitle: 'WhatsThat?',
};

export default LandingScreen;
