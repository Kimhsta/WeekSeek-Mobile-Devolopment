import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getAllFilms } from '../../services/filmServices';
import { Film } from '../../types/film';
import { Eye, Timer } from 'lucide-react-native';
import { WebView } from 'react-native-webview';

const BASE_URL = 'http://192.168.234.253:3000/uploads/posters'; // ← Ganti sesuai IP kamu

export default function DetailScreen() {
  const route = useRoute();
  const { id } = route.params as { id: number };
  const [film, setFilm] = useState<Film | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const res = await getAllFilms();
        const found = res.find((f: Film) => f.id === id);
        setFilm(found || null);
      } catch (err) {
        console.error('Error fetching film:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilm();
  }, [id]);

  const getYouTubeEmbedUrl = (url: string | null | undefined) => {
    if (!url) return null;
    const videoId = url.split('v=')[1]?.split('&')[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  if (!film) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-gray-500">Film tidak ditemukan</Text>
      </View>
    );
  }

  const trailerEmbedUrl = getYouTubeEmbedUrl(film.trailerUrl);

  return (
    <ScrollView className="flex-1 bg-white relative">
      {/* Tombol kembali */}

      {/* Poster */}
      <Image
        source={{ uri: `${BASE_URL}/${film.posterUrl}` }}
        className="w-full h-80"
        resizeMode="cover"
      />

      {/* Konten */}
      <View className="p-5">
        {/* Judul */}
        <Text className="text-2xl font-bold text-gray-900 mb-2">
          {film.title}
        </Text>

        {/* Info Ringkas */}
        <View className="flex-row flex-wrap items-center gap-x-4 gap-y-2 mb-4">
          <View className="bg-blue-100 px-3 py-1 rounded-full self-start">
            <Text className="text-sm text-blue-600 font-medium">{film.genre}</Text>
          </View>

          <View className="flex-row items-center">
            <Timer size={14} color="#6b7280" />
            <Text className="text-sm text-gray-500">{film.duration} Menit</Text>
          </View>
          <View className="flex-row items-center">
            <Eye size={14} color="#6b7280" />
            <Text className="text-sm text-gray-500 ml-1">{film.views ?? 0} Views</Text>
          </View>
        </View>

        {/* Deskripsi */}
        <Text className="text-base text-gray-700 leading-relaxed mb-6">
          {film.description}
        </Text>

        {/* Trailer */}
        {trailerEmbedUrl && (
          <View className="aspect-video rounded-xl overflow-hidden border border-gray-200">
            <WebView
              source={{ uri: trailerEmbedUrl }}
              javaScriptEnabled
              allowsFullscreenVideo
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}
