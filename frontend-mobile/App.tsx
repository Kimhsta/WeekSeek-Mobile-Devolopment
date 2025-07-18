import "./global.css";
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuthStore } from './src/store/authStore';
import { ActivityIndicator, View } from 'react-native';

// Navigators
import AuthStack from './src/navigation/AuthStack';
import AdminStack from './src/navigation/AdminStack';
import UserStack from './src/navigation/UserStack';

export default function App() {
  const { user, loading } = useAuthStore();

  // Tampilkan loading spinner saat status login masih dicek
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
        <AuthStack />              // Login & Register screen
      ) : user.role === 'admin' ? (
        <AdminStack />            // Untuk admin
      ) : (
        <UserStack />             // Untuk user biasa
      )}
    </NavigationContainer>
  );
}
