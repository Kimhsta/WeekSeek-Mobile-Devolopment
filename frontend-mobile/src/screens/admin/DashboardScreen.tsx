import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../../store/authStore';
import { LogOut, Film, User } from 'lucide-react-native';

export default function DashboardScreen() {
  const navigation = useNavigation();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' as never }],
    });
  };

  return (
    <ScrollView className="flex-1 bg-white p-6">
      {/* === Profile Section === */}
      <View className="items-center mb-8">
        {user?.profile ? (
          <Image
            source={{ uri: `http://192.168.234.253:3000/uploads/profile/${user.profile}` }}
            className="w-24 h-24 rounded-full mb-2"
          />
        ) : (
          <View className="w-24 h-24 rounded-full bg-gray-300 mb-2" />
        )}
        <Text className="text-xl font-semibold text-gray-800">{user?.username}</Text>
        <Text className="text-sm text-gray-500">{user?.email}</Text>
      </View>

      {/* === Navigation Menu === */}
      <View className="space-y-4">
        <TouchableOpacity
          className="flex-row items-center p-4 bg-blue-100 rounded-xl"
          onPress={() => navigation.navigate('FilmList' as never)}
        >
          <Film color="#2563eb" size={20} />
          <Text className="ml-3 text-blue-700 font-semibold">Kelola Film</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center p-4 bg-purple-100 rounded-xl"
          onPress={() => navigation.navigate('AddFilm' as never)}
        >
          <Film color="#7c3aed" size={20} />
          <Text className="ml-3 text-purple-700 font-semibold">Tambah Film</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center p-4 bg-green-100 rounded-xl"
          onPress={() => navigation.navigate('EditProfileScreen' as never)}
        >
          <User color="#16a34a" size={20} />
          <Text className="ml-3 text-green-700 font-semibold">Akun Saya</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center p-4 bg-red-100 rounded-xl"
          onPress={handleLogout}
        >
          <LogOut color="#dc2626" size={20} />
          <Text className="ml-3 text-red-600 font-semibold">Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
