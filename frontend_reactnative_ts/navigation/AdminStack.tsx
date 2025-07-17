import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DashboardScreen from '../screens/admin/DashboardScreen';
import ManageFilmsScreen from '../screens/admin/ManageFilmsScreen';
import AddFilmScreen from '../screens/admin/AddFilmScreen';
import ManageUsersScreen from '../screens/admin/ManageUsersScreen';

const Stack = createNativeStackNavigator();

const AdminStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="ManageFilms" component={ManageFilmsScreen} />
      <Stack.Screen name="AddFilm" component={AddFilmScreen} />
      <Stack.Screen name="ManageUsers" component={ManageUsersScreen} />
    </Stack.Navigator>
  );
};

export default AdminStack;
