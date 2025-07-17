import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { register as registerAPI } from '../../services/auth.service';

const RegisterScreen = () => {
  const { login } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Semua field wajib diisi');
      return;
    }

    setLoading(true);
    try {
      await registerAPI({ name, email, password }); // kirim ke backend
      await login(email, password); // langsung login otomatis
    } catch (error) {
      Alert.alert('Registrasi Gagal', 'Periksa input atau email sudah digunakan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-3xl font-bold text-center text-green-600 mb-10">Register</Text>

      <Text className="text-base mb-2 text-gray-700">Nama</Text>
      <TextInput
        className="border border-gray-300 rounded-md p-3 mb-4"
        placeholder="Masukkan nama lengkap"
        value={name}
        onChangeText={setName}
      />

      <Text className="text-base mb-2 text-gray-700">Email</Text>
      <TextInput
        className="border border-gray-300 rounded-md p-3 mb-4"
        placeholder="Masukkan email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Text className="text-base mb-2 text-gray-700">Password</Text>
      <TextInput
        className="border border-gray-300 rounded-md p-3 mb-6"
        placeholder="Masukkan password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        onPress={handleRegister}
        className={`bg-green-600 rounded-md py-3 ${loading ? 'opacity-50' : ''}`}
        disabled={loading}
      >
        <Text className="text-white text-center font-semibold text-lg">
          {loading ? 'Memproses...' : 'Register'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
