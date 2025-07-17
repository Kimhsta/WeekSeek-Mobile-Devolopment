import axios from 'axios';
import Constants from 'expo-constants';

const instance = axios.create({
  baseURL: Constants.expoConfig?.extra?.API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
