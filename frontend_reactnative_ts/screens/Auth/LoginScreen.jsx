import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from '../../context/AuthContext';

const LoginScreen = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email dan password wajib diisi');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      Alert.alert('Login Gagal', 'Email atau password salah');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-3xl font-bold text-center text-blue-600 mb-10">Login</Text>

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
        onPress={handleLogin}
        className={`bg-blue-600 rounded-md py-3 ${loading ? 'opacity-50' : ''}`}
        disabled={loading}
      >
        <Text className="text-white text-center font-semibold text-lg">
          {loading ? 'Memproses...' : 'Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
