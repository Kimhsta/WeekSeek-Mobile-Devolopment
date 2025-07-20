import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import { useAuthStore } from '../../store/authStore';
import { LogOut, Mail, User, BadgeCheck } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../../services/api';  // ← impor API_URL

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();
  const navigation = useNavigation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = async () => {
    setShowLogoutModal(false);
    await logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    });
  };

  if (!user) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-gray-500">Belum login</Text>
      </View>
    );
  }

  const profileUri = user.profile
    ? `${API_URL.replace('/api', '')}/uploads/profile/${user.profile}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}`;

  return (
    <View className="flex-1 bg-white px-6 pt-20">
      {/* Profile Picture */}
      <View className="items-center mb-6">
        <Image
          source={{ uri: profileUri }}
          className="w-28 h-28 rounded-full mb-4 border-4 border-blue-600"
        />
        <Text className="text-xl font-bold text-gray-900">{user.username}</Text>
      </View>

      {/* Informasi User */}
      <View className="space-y-4">
        <View className="flex-row mb-2 items-center bg-gray-100 p-3 rounded-xl">
          <User size={20} color="#2563EB" />
          <Text className="text-base ms-2 text-gray-800">{user.username}</Text>
        </View>
        <View className="flex-row mb-2 items-center bg-gray-100 p-3 rounded-xl">
          <Mail size={20} color="#2563EB" />
          <Text className="text-base ms-2 text-gray-800">{user.email}</Text>
        </View>
        <View className="flex-row mb-2 items-center bg-gray-100 p-3 rounded-xl">
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

      {/* Modal Konfirmasi Logout */}
      <Modal
        transparent
        visible={showLogoutModal}
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View className="flex-1 bg-black/40 justify-center items-center px-6">
          <View className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-lg">
            <Text className="text-lg font-bold text-gray-900 mb-2">Konfirmasi Keluar</Text>
            <Text className="text-sm text-gray-600 mb-4">
              Apakah kamu yakin ingin keluar dari akun?
            </Text>

            <View className="flex-row justify-end space-x-3">
              <TouchableOpacity
                onPress={() => setShowLogoutModal(false)}
                className="px-4 me-3 py-2 bg-gray-200 rounded-full"
              >
                <Text className="text-sm text-gray-700">Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={confirmLogout}
                className="px-4 py-2 bg-red-500 rounded-full flex-row items-center"
              >
                <Text className="text-sm text-white ml-2">Keluar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
