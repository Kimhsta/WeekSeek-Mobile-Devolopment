import React from 'react';
import { View, Text, Button } from 'react-native';
import api from './src/services/api';

export default function App() {
  const testApiConnection = async () => {
    try {
      const res = await api.get('/auth/profile'); // pastikan token tersimpan dulu
      console.log('Connected:', res.data);
      alert('Connected to backend!\nUser: ' + res.data.username);
    } catch (err: any) {
      console.log('Error:', err.response?.data || err.message);
      alert('Failed to connect: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <View className="items-center justify-center align-bottom bg-white">
      <Text className="text-lg mb-4">Cek Koneksi Backend</Text>
      <Button title="Test Connection" onPress={testApiConnection} />
    </View>
  );
}
