import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { useAuthStore } from '../../store/authStore';
import { LogOut, Mail, User, BadgeCheck } from 'lucide-react-native';

const BASE_URL = 'http://192.168.234.253:3000/uploads/profile'; // Ganti IP sesuai lokalmu

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    Alert.alert('Keluar', 'Yakin ingin logout?', [
      { text: 'Batal', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: async () => await logout() },
    ]);
  };

  if (!user) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-gray-500">Belum login</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white px-6 pt-20">
      {/* Profile Picture */}
      <View className="items-center mb-6">
        <Image
          source={{
            uri: user.profile
              ? `${BASE_URL}/${user.profile}`
              : `https://ui-avatars.com/api/?name=${user.username}`,
          }}
          className="w-28 h-28 rounded-full mb-4 border-4 border-blue-600"
        />
        <Text className="text-xl font-bold text-gray-900">{user.username}</Text>

      </View>

      {/* Informasi User */}
      <View className="space-y-4">
        <View className="flex-row mb-2 items-center space-x-3 bg-gray-100 p-3 rounded-xl">
          <User size={20} color="#2563EB" />
          <Text className="text-base ms-2 text-gray-800">{user.username}</Text>
        </View>
        <View className="flex-row mb-2 items-center space-x-3 bg-gray-100 p-3 rounded-xl">
          <Mail size={20} color="#2563EB" />
          <Text className="text-base ms-2 text-gray-800">{user.email}</Text>
        </View>
        <View className="flex-row items-center space-x-3 bg-gray-100 p-3 rounded-xl">
          <BadgeCheck size={20} color="#2563EB" />
          <Text className="text-base ms-2 text-gray-800 capitalize">{user.role}</Text>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        onPress={handleLogout}
        className="mt-10 bg-red-500 py-3 px-4 rounded-xl flex-row items-center justify-center"
      >
        <LogOut size={18} color="#fff" />
        <Text className="ml-2 text-white font-medium">Keluar</Text>
      </TouchableOpacity>
    </View>
  );
}
