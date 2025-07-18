import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { register } from '../../services/authService';
import { useNavigation } from '@react-navigation/native';
import { Mail, Eye, EyeOff, User, Image as ImageIcon, Key, CheckCircle2 } from 'lucide-react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');


  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      const uri =
        Platform.OS === 'android'
          ? asset.uri.startsWith('file://')
            ? asset.uri
            : `file://${asset.uri}`
          : asset.uri.replace('file://', '');

      setProfile({
        uri,
        name: asset.fileName || 'profile.jpg',
        type: asset.type?.startsWith('image/') ? asset.type : 'image/jpeg',
      });
    }
  };

  const handleRegister = async () => {
    if (!username || !email || !password) {
      alert('Semua field wajib diisi.');
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
          name: profile.name,
          type: profile.type,
        } as any);
      }

      await register(formData);
      setSuccessModal(true);
    } catch (err: any) {
      alert(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setSuccessModal(false);
    navigation.navigate('LoginScreen' as never);
  };

  return (
    <KeyboardAwareScrollView
    className="flex-1 bg-white"
    contentContainerStyle={{
      flexGrow: 1,
      justifyContent: 'center',
      paddingHorizontal: 20,
      minHeight: '100%',
    }}
    enableOnAndroid
    extraScrollHeight={100}
    keyboardShouldPersistTaps="handled"
    >
      <Text className="text-3xl font-bold text-blue-700 text-center mb-6">
        Daftar Akun
      </Text>

      {/* Username */}
      <View className="flex-row items-center border border-gray-300 rounded-xl px-4 py-3 mb-4 bg-gray-50">
        <User size={18} color="#6b7280" className="mr-2" />
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          className="flex-1 text-sm text-gray-800"
          placeholderTextColor="#9ca3af"
        />
      </View>

      {/* Email */}
      <View className="flex-row items-center border border-gray-300 rounded-xl px-4 py-3 mb-4 bg-gray-50">
        <Mail size={18} color="#6b7280" className="mr-2" />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          className="flex-1 text-sm text-gray-800"
          placeholderTextColor="#9ca3af"
        />
      </View>

      {/* Password */}
      <View className="flex-row items-center border border-gray-300 rounded-xl px-4 py-3 mb-4 bg-gray-50">
        <Key size={18} color="#6b7280" className="mr-2" />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureText}
          autoCapitalize="none"
          className="flex-1 text-sm text-gray-800 pr-2"
          placeholderTextColor="#9ca3af"
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          {secureText ? (
            <EyeOff size={18} color="#6b7280" />
          ) : (
            <Eye size={18} color="#6b7280" />
          )}
        </TouchableOpacity>
      </View>

      {/* Upload Image */}
      <TouchableOpacity
        onPress={pickImage}
        className="flex-row items-center justify-center bg-gray-200 p-3 rounded-xl mb-4"
      >
        <ImageIcon size={18} color="#4b5563" className="mr-2" />
        <Text className="text-gray-700">Pilih Foto Profil</Text>
      </TouchableOpacity>

      {/* Preview Image */}
      {profile && (
        <Image
          source={{ uri: profile.uri }}
          className="w-24 h-24 rounded-full self-center mb-4"
        />
      )}

      {/* Role */}
      <TouchableOpacity
        onPress={() => setRole(role === 'user' ? 'admin' : 'user')}
        className="bg-blue-100 py-3 rounded-xl mb-4"
      >
        <Text className="text-center text-blue-800 font-medium">Role: {role}</Text>
      </TouchableOpacity>

      {/* Submit */}
      <TouchableOpacity
        onPress={handleRegister}
        className={`bg-blue-600 py-3 rounded-xl ${loading ? 'opacity-50' : ''}`}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-center text-white font-semibold">Daftar</Text>
        )}
      </TouchableOpacity>

      {/* Login link */}
      <View className="flex-row justify-center mt-6">
        <Text className="text-gray-600">Sudah punya akun?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen' as never)}>
          <Text className="text-blue-600 ml-1 font-semibold">Login</Text>
        </TouchableOpacity>
      </View>

      {/* Modal sukses */}
      <Modal isVisible={successModal}>
        <View className="bg-white rounded-2xl p-6 items-center justify-center">
          <CheckCircle2 size={48} color="#22c55e" className="mb-2" />
          <Text className="text-xl font-semibold text-gray-800 mb-2">
            Registrasi Berhasil
          </Text>
          <Text className="text-gray-600 mb-4 text-center">
            Silakan login dengan akun yang telah dibuat.
          </Text>
          <TouchableOpacity
            onPress={handleSuccessClose}
            className="bg-blue-600 px-5 py-2 rounded-lg"
          >
            <Text className="text-white font-semibold">OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </KeyboardAwareScrollView>
  );
}
