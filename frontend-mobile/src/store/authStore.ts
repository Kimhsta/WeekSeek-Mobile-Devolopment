import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login as loginApi, logout as logoutApi, UserProfile } from '../services/authService';

interface AuthState {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { user } = await loginApi(email, password);
      set({ user });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Login failed' });
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    await logoutApi();
    set({ user: null });
  },
}));
