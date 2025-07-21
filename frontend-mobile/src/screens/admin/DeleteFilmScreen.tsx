import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { getAllFilms, deleteFilm } from '../../services/filmServices';
import { Film } from '../../types/film';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

export default function DeleteFilmScreen() {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const navigation = useNavigation();

  const fetchFilms = async () => {
    setLoading(true);
    try {
      const data = await getAllFilms();
      setFilms(data);
    } catch (err) {
      console.error('Error fetching films:', err);
      Alert.alert('Error', 'Gagal mengambil daftar film');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilms();
  }, []);

  const confirmDelete = (id: number) => {
    Alert.alert(
      'Konfirmasi Hapus',
      'Apakah Anda yakin ingin menghapus film ini?',
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Hapus', style: 'destructive', onPress: () => handleDelete(id) }
      ]
    );
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await deleteFilm(id);
      Alert.alert('Sukses', 'Film berhasil dihapus');
      fetchFilms();
    } catch (err) {
      console.error('Error deleting film:', err);
      Alert.alert('Error', 'Gagal menghapus film');
    } finally {
      setDeletingId(null);
    }
  };

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
      </View>
      <TouchableOpacity
        className="px-3 py-1 bg-red-500 rounded-md flex-row items-center"
        onPress={() => confirmDelete(item.id)}
        disabled={deletingId === item.id}
      >
        {deletingId === item.id ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Icon name="delete" size={20} color="white" />
        )}
      </TouchableOpacity>
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
      {films.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500">Tidak ada film untuk dihapus</Text>
        </View>
      ) : (
        <FlatList
          data={films}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
