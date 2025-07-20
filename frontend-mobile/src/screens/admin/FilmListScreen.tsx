import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { getAllFilms } from '../../services/filmServices';
import { Film } from '../../types/film';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import AddFilmScreen from './AddFilmScreen';

export default function FilmListScreen() {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchFilms = async () => {
    try {
      const res = await getAllFilms();
      setFilms(res);
    } catch (error) {
      console.error('Error fetching films:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilms();
  }, []);

  const renderItem = ({ item }: { item: Film }) => (
    <View className="bg-white rounded-xl mb-4 shadow p-4 flex-row items-center">
      <Image
        source={{ uri: item.posterUrl }}
        className="w-20 h-28 rounded-md mr-4 bg-gray-200"
        resizeMode="cover"
      />
      <View className="flex-1">
        <Text className="text-lg font-bold text-slate-800">{item.title}</Text>
        <Text className="text-sm text-gray-600">{item.genre}</Text>
        <Text className="text-sm text-gray-600">{item.releaseYear}</Text>
        <View className="flex-row flex-wrap mt-3 gap-2">
          <TouchableOpacity
            className="px-3 py-1 bg-blue-500 rounded-md"
            onPress={() => navigation.navigate('EditFilm' as never, { film: item } as never)}
          >
            <Text className="text-white text-sm">Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="px-3 py-1 bg-red-500 rounded-md"
            onPress={() => console.log('Delete film', item.id)}
          >
            <Text className="text-white text-sm">Hapus</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="px-3 py-1 bg-gray-500 rounded-md"
            onPress={() => navigation.navigate('DetailFilm' as never, { film: item } as never)}
          >
            <Text className="text-white text-sm">Detail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#2F4156" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50 px-4 pt-4">
      <FlatList
        data={films}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

      {/* Tombol + Tambah Film */}
      <TouchableOpacity
        className="absolute bottom-6 right-6 bg-blue-600 w-14 h-14 rounded-full justify-center items-center shadow-lg"
        onPress={() => setShowAddModal(true)}
      >
        <Icon name="add" size={30} color="white" />
      </TouchableOpacity>

      <AddFilmScreen visible={showAddModal} onClose={() => setShowAddModal(false)} />
    </View>
  );
}
