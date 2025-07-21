import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Alert,
  useWindowDimensions,
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Print from 'expo-print';
import { getAllFilms } from '../../services/filmServices';
import { Film } from '../../types/film';
import { useAuthStore } from '../../store/authStore';

export default function DashboardScreen() {
  const { user } = useAuthStore();
  const username = user?.username || 'Admin';
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getAllFilms();
      setFilms(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const totalFilms = films.length;
  const totalViews = films.reduce((sum, f) => sum + f.views, 0);
  const latestFilm = films[0] || null;
  const popularFilms = [...films]
    .sort((a, b) => b.views - a.views)
    .slice(0, 3);

  const generateHTML = () => {
    const rows = films
      .map(
        (f) => `
      <tr>
        <td style="border:1px solid #ddd;padding:8px">${f.id}</td>
        <td style="border:1px solid #ddd;padding:8px">${f.title}</td>
        <td style="border:1px solid #ddd;padding:8px">${f.genre || '-'}</td>
        <td style="border:1px solid #ddd;padding:8px">${f.releaseYear}</td>
        <td style="border:1px solid #ddd;padding:8px">${f.views}</td>
      </tr>
    `
      )
      .join('');

    return `
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            table { width:100%; border-collapse: collapse; }
            th, td { border:1px solid #ddd; padding:8px; text-align:left; }
            th { background-color:#f4f4f4; }
          </style>
        </head>
        <body>
          <h1>Daftar Film</h1>
          <table>
            <tr>
              <th>ID</th><th>Title</th><th>Genre</th><th>Release Year</th><th>Views</th>
            </tr>
            ${rows}
          </table>
        </body>
      </html>
    `;
  };

  const handleAddFilm = () => navigation.navigate('FilmList');
  const handleDeleteFilm = () => navigation.navigate('FilmList');
  const handleReport = async () => {
    if (films.length === 0) {
      Alert.alert('Laporan', 'Tidak ada film untuk dicetak.');
      return;
    }
    try {
      const html = generateHTML();
      await Print.printAsync({ html });
    } catch (err) {
      console.error('Print Error:', err);
      Alert.alert('Error', 'Gagal mencetak laporan.');
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#2F4156" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      {/* Header */}
      <View className="mb-6">
        <Text className="text-gray-600 mt-2">
          Selamat datang kembali,{' '}
          <Text className="font-semibold text-slate-800">{username}</Text>!
        </Text>
      </View>

      {/* Stats Cards */}
      <View className="flex-row flex-wrap justify-between mb-6 gap-4">
        <View className="flex-1 min-w-[150px] bg-white rounded-2xl p-4 shadow">
          <View className="flex-row items-center">
            <View className="p-3 bg-blue-100 rounded-full">
              <Ionicons name="film" size={24} color="#3B82F6" />
            </View>
            <View className="ml-3 min-w-0">
              <Text className="text-lg font-semibold text-slate-800">
                {totalFilms}
              </Text>
              <Text className="text-sm text-gray-500">Total Film</Text>
            </View>
          </View>
        </View>
        <View className="flex-1 min-w-[150px] bg-white rounded-2xl p-4 shadow">
          <View className="flex-row items-center">
            <View className="p-3 bg-green-100 rounded-full">
              <MaterialIcons name="visibility" size={24} color="#10B981" />
            </View>
            <View className="ml-3 min-w-0">
              <Text className="text-lg font-semibold text-slate-800">
                {totalViews}
              </Text>
              <Text className="text-sm text-gray-500">Total Views</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Latest Film Card */}
      {latestFilm && (
        <View className="bg-white rounded-2xl p-4 shadow mb-6">
          <Text className="text-lg font-semibold text-slate-800 mb-2">
            Film Terbaru
          </Text>
          <View className="flex-row items-center">
            <Image
              source={{ uri: latestFilm.posterUrl }}
              className="w-20 h-28 rounded-md bg-gray-200"
              resizeMode="cover"
            />
            <View className="ml-4 flex-1">
              <Text
                className="text-base font-bold text-slate-800"
                numberOfLines={1}
              >
                {latestFilm.title}
              </Text>
              <Text className="text-sm text-gray-600 mt-1">
                Genre: {latestFilm.genre || '-'}
              </Text>
              <Text className="text-sm text-gray-600">
                Rilis: {latestFilm.releaseYear}
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Popular Films */}
      {popularFilms.length > 0 && (
        <View className="bg-white rounded-2xl p-4 shadow mb-6">
          <Text className="text-lg font-semibold text-slate-800 mb-4">
            Film Populer
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <View className="flex-row gap-4">
              {popularFilms.map((film) => (
                <View
                  key={film.id}
                  className="w-40 bg-gray-50 rounded-lg p-2 shadow"
                >
                  <Image
                    source={{ uri: film.posterUrl }}
                    className="w-full h-24 rounded-md mb-2 bg-gray-200"
                    resizeMode="cover"
                  />
                  <Text
                    className="text-sm font-semibold text-slate-800"
                    numberOfLines={1}
                  >
                    {film.title}
                  </Text>
                  <Text className="text-xs text-gray-500">
                    Views: {film.views}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      {/* Quick Actions */}
      <View className="bg-white rounded-2xl p-4 shadow">
        <Text className="text-lg font-semibold text-slate-800 mb-4">
          Aksi Cepat
        </Text>
        <View className="flex-row justify-around flex-wrap gap-4">
          <TouchableOpacity
            onPress={handleAddFilm}
            className="items-center w-24"
          >
            <View className="p-4 bg-blue-100 rounded-full mb-2">
              <FontAwesome5 name="plus" size={20} color="#3B82F6" />
            </View>
            <Text className="text-sm text-slate-800 text-center">
              Tambah Film
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDeleteFilm}
            className="items-center w-24"
          >
            <View className="p-4 bg-red-100 rounded-full mb-2">
              <MaterialIcons name="delete" size={20} color="#EF4444" />
            </View>
            <Text className="text-sm text-slate-800 text-center">
              Hapus Film
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleReport}
            className="items-center w-24"
          >
            <View className="p-4 bg-green-100 rounded-full mb-2">
              <Ionicons name="stats-chart" size={20} color="#10B981" />
            </View>
            <Text className="text-sm text-slate-800 text-center">
              Cetak PDF
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
