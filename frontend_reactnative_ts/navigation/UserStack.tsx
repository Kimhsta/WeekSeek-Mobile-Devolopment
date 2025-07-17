import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/user/HomeScreen';
import FilmDetailScreen from '../screens/user/FilmDetailScreen';
import WatchHistoryScreen from '../screens/user/WatchHistoryScreen';
import ProfileScreen from '../screens/user/ProfileScreen';

const Stack = createNativeStackNavigator();

const UserStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Detail" component={FilmDetailScreen} />
      <Stack.Screen name="History" component={WatchHistoryScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default UserStack;
