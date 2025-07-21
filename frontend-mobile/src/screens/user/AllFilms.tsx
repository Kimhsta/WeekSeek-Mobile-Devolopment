import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { Eye } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { getAllFilms } from '../../services/filmServices';
import { Film } from '../../types/film';

export default function AllFilms() {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const res = await getAllFilms();
        setFilms(res);
      } catch (err) {
        console.error('Error fetching films:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFilms();
  }, []);

  const renderItem = ({ item }: { item: Film }) => (
    <TouchableOpacity
      className="flex-row items-center bg-white rounded-2xl shadow-sm mb-4 overflow-hidden"
      onPress={() =>
        navigation.navigate('Detail' as never, { id: item.id } as never)
      }
    >
      <Image
        source={{ uri: item.posterUrl }}        // langsung pakai item.posterUrl
        className="w-28 h-40 rounded-l-2xl"
        resizeMode="cover"
      />
      <View className="flex-1 px-4 py-3">
        <Text className="text-lg font-semibold text-gray-900">{item.title}</Text>
        <Text className="text-sm text-gray-600 mt-1" numberOfLines={2}>
          {item.description}
        </Text>
        <View className="flex-row items-center mt-4">
          <Eye size={16} color="#6b7280" />
          <Text className="text-xs text-gray-500 ml-1">{item.views} views</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 pt-4">
      <Text className="text-xl font-bold text-gray-800 mb-4">All Films</Text>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#2563EB" />
        </View>
      ) : (
        <FlatList
          data={films}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text className="text-center text-gray-500 mt-10">
              Belum ada film tersedia
            </Text>
          }
        />
      )}
    </View>
  );
}
