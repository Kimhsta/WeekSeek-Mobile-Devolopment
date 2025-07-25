import "./global.css";
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuthStore } from './src/store/authStore';
import { ActivityIndicator, View } from 'react-native';

// Navigators
import AuthStack from './src/navigation/AuthStack';
import AdminDrawer from "./src/navigation/AdminDrawer";
import UserStack from './src/navigation/UserStack';

export default function App() {
  const { user, loading } = useAuthStore();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {!user ? (
        <AuthStack />         
      ) : user.role === 'admin' ? (
        <AdminDrawer />            
      ) : (
        <UserStack />         
      )}
    </NavigationContainer>
  );
}
