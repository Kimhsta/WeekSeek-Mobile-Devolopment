import axios from './api'; // gunakan instance dari api.ts
import { User } from '../types';

export const login = async (email: string, password: string): Promise<{ token: string }> => {
  const res = await axios.post('/auth/login', { email, password });
  return res.data;
};

export const getMe = async (token: string): Promise<User> => {
  const res = await axios.get('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.user;
};

export const register = async (data: { name: string; email: string; password: string }) => {
  const res = await api.post('/auth/register', data);
  return res.data;
};
