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
      const res = await loginApi(email, password);

      // Simpan ke AsyncStorage
      await AsyncStorage.setItem('token', res.token);
      await AsyncStorage.setItem('user', JSON.stringify(res.user));

      set({
        user: res.user,
        token: res.token,
      });
    } catch (error: any) {
      set({
        error: error?.response?.data?.message || 'Login gagal',
      });
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await logoutApi(); // Jika backend butuh logout
    } catch (err) {
      console.warn('Logout API gagal (bisa diabaikan)');
    }

    // Hapus dari AsyncStorage
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');

    set({ user: null, token: null });
  },
}));
