// src/screens/auth/RegisterScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { register } from '../../services/authService';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setProfile(result.assets[0]);
    }
  };

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert("Gagal", "Semua field wajib diisi.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('role', role);

      if (profile) {
        formData.append('profile', {
          uri: profile.uri,
          name: 'profile.jpg',
          type: 'image/jpeg',
        } as any);
      }

      await register(formData);
      Alert.alert('Sukses', 'Registrasi berhasil!', [
        { text: 'OK', onPress: () => navigation.navigate('Login' as never) },
      ]);
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Terjadi kesalahan saat mendaftar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-white"
    >
      <ScrollView contentContainerStyle={{ padding: 20 }} keyboardShouldPersistTaps="handled">
        <Text className="text-2xl font-bold text-center mb-6">Daftar Akun</Text>

        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          className="border border-gray-300 rounded-lg px-4 py-3 mb-3"
        />

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          className="border border-gray-300 rounded-lg px-4 py-3 mb-3"
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="border border-gray-300 rounded-lg px-4 py-3 mb-3"
        />

        <TouchableOpacity onPress={pickImage} className="bg-gray-200 p-3 rounded-lg mb-3">
          <Text className="text-center text-gray-700">Pilih Foto Profil</Text>
        </TouchableOpacity>

        {profile && (
          <Image
            source={{ uri: profile.uri }}
            className="w-24 h-24 rounded-full self-center mb-4"
          />
        )}

        <TouchableOpacity
          onPress={() => setRole(role === 'user' ? 'admin' : 'user')}
          className="bg-blue-100 py-3 rounded-lg mb-4"
        >
          <Text className="text-center text-blue-800">Role: {role}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleRegister}
          className={`bg-blue-600 py-3 rounded-lg ${loading && 'opacity-50'}`}
          disabled={loading}
        >
          <Text className="text-center text-white font-semibold">
            {loading ? 'Mendaftar...' : 'Daftar'}
          </Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-600">Sudah punya akun?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}>
            <Text className="text-blue-600 ml-1">Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
