import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Search, Eye } from 'lucide-react-native';
import { getAllFilms } from '../../services/filmServices';
import { Film } from '../../types/film';
import { useNavigation } from '@react-navigation/native';

export default function SearchScreen() {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      try {
        const res = await getAllFilms();
        setFilms(res);
      } catch (err) {
        console.error('Error fetching films:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const CATEGORIES = ['All', 'Action', 'Drama', 'Comedy', 'Horror','Romance'];

  const filteredFilms = films.filter((film) => {
    const matchCategory =
      selectedCategory === 'All' || film.genre === selectedCategory;
    const matchTitle = film.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
    return matchCategory && matchTitle;
  });

  const renderItem = ({ item }: { item: Film }) => (
    <TouchableOpacity
      className="mb-4 bg-white p-3 rounded-xl shadow"
      onPress={() =>
        navigation.navigate('Detail' as never, { id: item.id } as never)
      }
    >
      <Image
        source={{ uri: item.posterUrl }} // langsung pakai posterUrl lengkap
        className="w-full h-60 rounded-md mb-3"
        resizeMode="cover"
      />
      <Text className="text-lg font-bold text-gray-900 mb-1">{item.title}</Text>
      <Text className="text-sm text-gray-600 mb-1">
        {item.genre} · {item.duration}m
      </Text>
      <Text className="text-sm text-gray-600 mb-2">{item.description}</Text>
      <View className="flex-row items-center">
        <Eye size={14} color="#6b7280" />
        <Text className="text-xs text-gray-500 ml-1">{item.views ?? 0} views</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <View className="flex-col bg-gray-100 px-4 pt-14">
      {/* Search Bar */}
      <View className="flex-row items-center bg-white rounded-xl px-4 py-2 shadow mb-4">
        <Search size={18} color="#9CA3AF" />
        <TextInput
          className="ml-2 flex-1 text-sm text-gray-800"
          placeholder="Cari berdasarkan judul film"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Kategori */}
      <View className="mb-5">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <View className="flex-row flex-wrap">
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => setSelectedCategory(category)}
                className={`px-4 py-2 mr-2 mb-2 rounded-full ${
                  selectedCategory === category ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <Text
                  className={`text-sm ${
                    selectedCategory === category ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* List Film */}
      <FlatList
        data={filteredFilms}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text className="text-center text-gray-400 mt-10">
            Tidak ada hasil ditemukan
          </Text>
        }
      />
    </View>
  );
}
