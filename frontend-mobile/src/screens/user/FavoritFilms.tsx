import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { getAllFilms } from '../../services/filmServices';
import { Film } from '../../types/film';
import { Eye } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native'; // ✅ Tambahkan ini

const BASE_URL = 'http://192.168.234.253:3000/uploads/posters';

export default function Favorit() {
  const [films, setFilms] = useState<Film[]>([]);
  const navigation = useNavigation(); // ✅ Inisialisasi navigation

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllFilms();
        setFilms(res);
      } catch (err) {
        console.error('Error fetching films:', err);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }: { item: Film }) => (
    <TouchableOpacity
      className="mr-4 w-40"
      onPress={() => navigation.navigate('Detail' as never, { id: item.id } as never)} // ✅ Navigasi ke detail
    >
      <Image
        source={{ uri: `${BASE_URL}/${item.posterUrl}` }}
        className="w-full h-60 rounded-xl mb-2"
        resizeMode="cover"
      />
      <Text className="text-sm font-semibold text-gray-800" numberOfLines={1}>
        {item.title}
      </Text>
      <View className="flex-row items-center justify-between mt-1">
        <Text className="text-xs text-gray-500">
          {item.genre} · {item.duration} menit
        </Text>
        <View className="flex-row items-center ml-2">
          <Text className="text-xs text-gray-400 me-1">{item.views ?? 0}</Text>
          <Eye size={14} color="#9CA3AF" />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="mt-6">
      <Text className="text-xl font-bold text-gray-900 mb-4">Trending Films</Text>
      <FlatList
        horizontal
        data={films}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
