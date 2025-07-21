import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface LoginResponse {
  token: string;
  user: UserProfile;
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  name?: string;
  role: 'user' | 'admin';
  profile?: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const res = await api.post('/auth/login', { email, password });

  const { token, user } = res.data;

  await AsyncStorage.setItem('token', token);

  return { token, user };
};

export const register = (formData: FormData) =>
  api.post('/auth/register', formData, {
    transformRequest: (data) => data,
    headers: {
      'Content-Type': 'multipart/form-data', 
    },
  });


export const logout = async () => {
  try {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
  } catch (err) {
    console.warn('Gagal menghapus token dari AsyncStorage:', err);
  }
};
