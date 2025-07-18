import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../../store/authStore';
import { Eye, EyeOff, Mail, Key } from 'lucide-react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  const { login, loading, error, user } = useAuthStore();

  const handleLogin = async () => {
    await login(email, password);

    if (user?.role === 'admin') {
      navigation.replace('AdminDashboard');
    } else if (user?.role === 'user') {
      navigation.replace('UserHome');
    }
  };

  return (
    <KeyboardAwareScrollView
      className="flex-1 bg-white px-4"
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      enableOnAndroid={true}
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
    >
      <View>
        <Text className="text-3xl font-bold text-blue-700 text-center mb-8">
          Selamat Datang 👋
        </Text>

        {/* Email Field */}
        <View className="flex-row items-center border border-gray-300 rounded-xl px-3 py-2 mb-4 bg-gray-50">
          <Mail size={18} color="#6b7280" className="mr-3" />
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

        {/* Password Field */}
        <View className="flex-row items-center border border-gray-300 rounded-xl px-3 py-2 mb-4 bg-gray-50">
          <Key size={18} color="#6b7280" className="mr-3" />
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

        {/* Error Message */}
        {error && <Text className="text-red-500 mb-3 text-sm">{error}</Text>}

        {/* Login Button */}
        <TouchableOpacity
          onPress={handleLogin}
          className="bg-blue-600 py-3 rounded-xl items-center mb-4"
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-semibold text-base">Login</Text>
          )}
        </TouchableOpacity>

        {/* Register Redirect */}
        <View className="flex-row justify-center mt-2">
          <Text className="text-gray-600 text-sm">Belum punya akun? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
            <Text className="text-blue-600 font-semibold text-sm">Daftar sekarang</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}       