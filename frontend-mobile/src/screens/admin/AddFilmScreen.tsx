import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { addFilm } from '../../services/filmServices';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../../services/api';

interface AddFilmScreenProps {
  visible: boolean;
  onClose: () => void;
  onAdded?: () => void; // callback when film added
}

export default function AddFilmScreen({ visible, onClose, onAdded }: AddFilmScreenProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [duration, setDuration] = useState('');
  const [poster, setPoster] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setPoster(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    if (!title || !description || !genre || !releaseYear || !duration || !poster) {
      alert('Semua field harus diisi!');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('genre', genre);
    formData.append('release_year', releaseYear);
    formData.append('duration', duration);
    formData.append('poster', {
      uri: poster.uri,
      name: poster.fileName || `poster-${Date.now()}.jpg`,
      type: poster.type || 'image/jpeg',
    } as any);

    try {
      setLoading(true);
      await addFilm(formData);
      setLoading(false);
      onClose();
      onAdded && onAdded();
      // optional: refresh list in parent
    } catch (err) {
      setLoading(false);
      console.error(err);
      alert('Gagal menambahkan film.');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View className="flex-1 justify-center items-center bg-black/40 px-4">
        <View className="bg-white w-full max-w-xl rounded-2xl p-6">
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text className="text-lg font-bold text-gray-800 mb-4">Tambah Film</Text>

            <TextInput
              placeholder="Judul"
              className="border border-gray-300 p-2 rounded-md mb-3"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              placeholder="Deskripsi"
              className="border border-gray-300 p-2 rounded-md mb-3"
              multiline
              numberOfLines={3}
              value={description}
              onChangeText={setDescription}
            />
            <TextInput
              placeholder="Genre"
              className="border border-gray-300 p-2 rounded-md mb-3"
              value={genre}
              onChangeText={setGenre}
            />
            <TextInput
              placeholder="Tahun Rilis"
              keyboardType="numeric"
              className="border border-gray-300 p-2 rounded-md mb-3"
              value={releaseYear}
              onChangeText={setReleaseYear}
            />
            <TextInput
              placeholder="Durasi (menit)"
              keyboardType="numeric"
              className="border border-gray-300 p-2 rounded-md mb-3"
              value={duration}
              onChangeText={setDuration}
            />

            <TouchableOpacity
              onPress={handleImagePick}
              className="bg-gray-100 p-3 rounded-md mb-4 items-center"
            >
              <Text className="text-gray-700">Pilih Poster</Text>
              {poster && (
                <Image
                  source={{ uri: poster.uri }}
                  className="w-28 h-40 mt-2 rounded-md"
                  resizeMode="cover"
                />
              )}
            </TouchableOpacity>

            {loading ? (
              <ActivityIndicator size="large" color="#2563EB" />
            ) : (
              <View className="flex-row justify-end space-x-3 mt-4">
                <TouchableOpacity
                  onPress={onClose}
                  className="bg-gray-200 px-4 py-2 rounded-md"
                >
                  <Text className="text-gray-700">Batal</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSubmit}
                  className="bg-blue-600 px-4 py-2 rounded-md"
                >
                  <Text className="text-white">Simpan</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
