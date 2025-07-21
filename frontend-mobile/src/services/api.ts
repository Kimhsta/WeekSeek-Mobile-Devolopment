import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEV_API, WEB_API, PHONE_API } from '@env';
import { Platform } from 'react-native';

let API_URL = DEV_API;

if (Platform.OS === 'web') {
  API_URL = WEB_API;
} else if (Platform.OS === 'android' || Platform.OS === 'ios') {
  API_URL = PHONE_API;
}

console.log('Platform:', Platform.OS);
console.log('API_URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export { API_URL };
export default api;
