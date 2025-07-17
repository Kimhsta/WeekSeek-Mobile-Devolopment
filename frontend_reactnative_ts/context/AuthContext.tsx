import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getMe, login as loginAPI } from '../services/auth.service';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {
    const { token } = await loginAPI(email, password);
    await AsyncStorage.setItem('token', token);
    const userData = await getMe(token);
    setUser(userData);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setUser(null);
  };

  const loadUser = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      try {
        const userData = await getMe(token);
        setUser(userData);
      } catch (e) {
        setUser(null);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
