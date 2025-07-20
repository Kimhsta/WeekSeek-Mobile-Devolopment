import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login as loginApi, logout as logoutApi, UserProfile } from '../services/authService';

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: UserProfile) => void;
  setToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { token, user } = await loginApi(email, password);

      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      set({ user, token });
    } catch (error: any) {
      const msg = error?.response?.data?.message || 'Login gagal';
      set({ error: msg });
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await logoutApi();
    } catch (err) {
      console.warn('Logout API gagal (bisa diabaikan)');
    }

    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');

    set({ user: null, token: null });
  },
}));
