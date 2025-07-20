import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DashboardScreen from '../screens/admin/DashboardScreen';
import FilmListScreen from '../screens/admin/FilmListScreen';
import AccountScreen from '../screens/admin/AccountScreen';
import { useAuthStore } from '../store/authStore';
import { API_URL } from '../services/api';

const Drawer = createDrawerNavigator();

function CustomDrawerContent({ navigation }: any) {
  const { user, logout } = useAuthStore();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const drawerItems = [
    { label: 'Dashboard', icon: 'dashboard', route: 'Dashboard' },
    { label: 'Films', icon: 'movie', route: 'FilmList' },
    { label: 'Akun', icon: 'person-outline', route: 'Account' },
  ];

  const confirmLogout = async () => {
    setShowLogoutModal(false);
    await logout();
  };

  return (
    <View className="flex-1 bg-white pt-16 px-5 pb-6">
      {user && (
        <View className="mb-8 items-center">
          {user.profile ? (
            <Image
              source={{
                uri: `${API_URL.replace('/api', '')}/uploads/profile/${user.profile}`,
              }}
              className="w-24 h-24 rounded-full mb-2 border border-gray-300"
            />
          ) : (
            <View className="w-24 h-24 rounded-full bg-gray-300 mb-2" />
          )}
          <Text className="text-lg font-bold text-slate-800">{user.username}</Text>
          <Text className="text-sm text-gray-500">{user.email}</Text>
        </View>
      )}

      {drawerItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate(item.route)}
          className="flex-row items-center py-3"
        >
          <Icon name={item.icon} size={20} color="#2F4156" style={{ marginRight: 12 }} />
          <Text className="text-base text-slate-700">{item.label}</Text>
        </TouchableOpacity>
      ))}

      {/* Tombol Logout */}
      <TouchableOpacity
        onPress={() => setShowLogoutModal(true)}
        className="flex-row items-center py-3 mt-8 border border-red-500 bg-red-50 rounded-xl px-4"
      >
        <Icon name="logout" size={20} color="#dc2626" style={{ marginRight: 12 }} />
        <Text className="text-base text-red-600">Logout</Text>
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

export default function AdminDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props: any) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        drawerType: 'front',
        drawerStyle: { width: 220 },
        swipeEnabled: false,
      }}
    >
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="FilmList" component={FilmListScreen} />
      <Drawer.Screen name="Account" component={AccountScreen} />
    </Drawer.Navigator>
  );
}
