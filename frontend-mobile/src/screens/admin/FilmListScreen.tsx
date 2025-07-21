import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { getAllFilms, deleteFilm } from '../../services/filmServices';
import { Film } from '../../types/film';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import AddFilmScreen from './AddFilmScreen';
import DeleteConfirmation from './DeleteConfirmation';
import DetailFilmScreen from './DetailFilmScreen';
import EditFilmScreen from './EditFilmScreen';

export default function FilmListScreen() {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const navigation = useNavigation();
  const [showAddModal, setShowAddModal] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [detailFilm, setDetailFilm] = useState<Film | null>(null);
  const [editVisible, setEditVisible] = useState(false);
  const [editFilm, setEditFilm] = useState<Film | null>(null);

  const fetchFilms = async () => {
    setLoading(true);
    try {
      const res = await getAllFilms();
      setFilms(res);
    } catch (error) {
      console.error('Error fetching films:', error);
      Alert.alert('Error', 'Gagal mengambil daftar film');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilms();
  }, []);

  const startDelete = (id: number) => {
    setSelectedId(id);
    setConfirmVisible(true);
  };

  const handleConfirm = async () => {
    if (selectedId === null) return;
    setDeletingId(selectedId);
    setConfirmVisible(false);
    try {
      await deleteFilm(selectedId);
      Alert.alert('Sukses', 'Film berhasil dihapus');
      fetchFilms();
    } catch (err) {
      console.error('Error deleting film:', err);
      Alert.alert('Error', 'Gagal menghapus film');
    } finally {
      setDeletingId(null);
      setSelectedId(null);
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
        <View className="flex-row flex-wrap mt-3 gap-2">
          <TouchableOpacity
            className="px-3 py-1 bg-blue-500 rounded-md"
            onPress={() => {
              setEditFilm(item);
              setEditVisible(true);
            }}
          >
            <Text className="text-white text-sm">Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="px-3 py-1 bg-red-500 rounded-md flex-row items-center"
            onPress={() => startDelete(item.id)}
            disabled={deletingId === item.id}
          >
            {deletingId === item.id ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text className="text-white text-sm">Hapus</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            className="px-3 py-1 bg-gray-500 rounded-md"
            onPress={() => {
              setDetailFilm(item);
              setDetailVisible(true);
            }}
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

      {/* Tombol Tambah Film */}
      <TouchableOpacity
        className="absolute bottom-6 right-6 bg-blue-600 w-14 h-14 rounded-full justify-center items-center shadow-lg"
        onPress={() => setShowAddModal(true)}
      >
        <Icon name="add" size={30} color="white" />
      </TouchableOpacity>

      {/* Modal Tambah Film */}
      <AddFilmScreen visible={showAddModal} onClose={() => setShowAddModal(false)} onAdded={fetchFilms} />

      {/* Modal Edit Film */}
      {editFilm && (
        <EditFilmScreen
          visible={editVisible}
          onClose={() => setEditVisible(false)}
          film={editFilm}
          onUpdated={fetchFilms}
        />
      )}

      {/* Modal Detail Film */}
      {detailFilm && (
        <DetailFilmScreen
          visible={detailVisible}
          onClose={() => {
            setDetailVisible(false);
            setDetailFilm(null);
          }}
          film={detailFilm}
        />
      )}

      {/* Modal Konfirmasi Hapus */}
      <DeleteConfirmation
        visible={confirmVisible}
        onConfirm={handleConfirm}
        onCancel={() => setConfirmVisible(false)}
      />
    </View>
  );
}
 