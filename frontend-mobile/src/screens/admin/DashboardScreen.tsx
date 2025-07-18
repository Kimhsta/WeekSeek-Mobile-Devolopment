import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function DashboardScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-6">Admin Dashboard</Text>

      <TouchableOpacity
        className="bg-blue-600 p-4 rounded-2xl mb-4"
        onPress={() => navigation.navigate('AddFilm' as never)}
      >
        <Text className="text-white font-semibold text-center">Tambah Film</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-green-600 p-4 rounded-2xl"
        onPress={() => navigation.navigate('FilmList' as never)}
      >
        <Text className="text-white font-semibold text-center">Kelola Film</Text>
      </TouchableOpacity>
    </View>
  );
}
