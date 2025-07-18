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

  const token = res.data.token;
  const user = res.data.user;

  await AsyncStorage.setItem('token', token);

  return { token, user };
};

export const register = (formData: FormData) =>
  api.post('/auth/register', formData);


export const logout = async () => {
  await AsyncStorage.removeItem('token');
};
