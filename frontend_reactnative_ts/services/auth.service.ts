import axios from './api';
import { User } from '../types';

// Login user
export const login = async (
  email: string,
  password: string
): Promise<{ token: string }> => {
  const res = await axios.post('/auth/login', { email, password });
  return res.data; // expected: { token }
};

// Register user
export const register = async (
  data: { profile?: string; username: string; email: string; password: string; role?: string }
): Promise<{ message: string; user: User }> => {
  const res = await axios.post('/auth/register', data);
  return res.data;
};
