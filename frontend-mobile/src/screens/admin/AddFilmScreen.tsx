import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator, Alert,} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { addFilm } from '../../services/filmServices';

interface AddFilmScreenProps {
  visible: boolean;
  onClose: () => void;
  onAdded?: () => void;
}

export default function AddFilmScreen({ visible, onClose, onAdded }: AddFilmScreenProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [duration, setDuration] = useState('');
  const [trailerUrl, setTrailerUrl] = useState('');
  const [poster, setPoster] = useState<ImagePicker.ImageInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  // Reset form tiap buka modal
  useEffect(() => {
    if (visible) {
      setTitle('');
      setDescription('');
      setGenre('');
      setReleaseYear('');
      setDuration('');
      setTrailerUrl('');
      setPoster(null);
      setLoading(false);
      setSuccessVisible(false);
    }
  }, [visible]);

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      return Alert.alert('Izin ditolak', 'Akses galeri diperlukan untuk memilih poster.');
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled && result.assets.length > 0) {
      setPoster(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    if (!title || !description || !genre || !releaseYear || !duration || !poster) {
      return Alert.alert('Error', 'Semua field harus diisi!');
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('genre', genre);
    formData.append('release_year', releaseYear);
    formData.append('duration', duration);
    formData.append('trailerUrl', trailerUrl);

    const uri = poster.uri;
    const filename = poster.fileName ?? uri.split('/').pop()!;
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : 'image/jpeg';
    formData.append('poster', { uri, name: filename, type } as any);

    try {
      await addFilm(formData);
      setSuccessVisible(true);
    } catch (err: any) {
      console.error('AddFilm error:', err.response || err);
      Alert.alert('Error', err.response?.data?.message || 'Gagal menambahkan film');
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setSuccessVisible(false);
    onAdded && onAdded();
    onClose();
  };

  return (
    <>
      <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
        <View className="flex-1 bg-black/50 justify-center px-4">
          <View className="bg-white rounded-2xl p-5 max-h-[90%]">
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text className="text-2xl font-bold text-center text-slate-800 mb-5">Tambah Film</Text>

              {/* Poster Picker */}
              <TouchableOpacity
                onPress={handleImagePick}
                className="self-center mb-5"
                activeOpacity={0.8}
              >
                <View className="relative">
                  <Image
                    source={{ uri: poster?.uri || 'https://via.placeholder.com/150' }}
                    className="w-36 h-52 rounded-xl bg-gray-100"
                    resizeMode="cover"
                  />
                  <View className="absolute inset-0 bg-black/20 rounded-xl flex-row justify-center items-center">
                    <Ionicons name="camera" size={32} color="white" />
                  </View>
                </View>
              </TouchableOpacity>

              {/* Input Fields */}
              <View className="space-y-4">
                {[
                  { label: 'Judul', value: title, setter: setTitle, placeholder: 'Judul film' },
                  { label: 'Genre', value: genre, setter: setGenre, placeholder: 'Aksi, Drama, dll' },
                  { label: 'Deskripsi', value: description, setter: setDescription, placeholder: 'Deskripsi...', multiline: true, height: 80 },
                ].map((field) => (
                  <View key={field.label} className="mb-4">
                    <Text className="text-sm font-medium text-slate-700 mb-1">{field.label}</Text>
                    <TextInput
                      className="border border-gray-300 rounded-lg px-3 py-2 text-base"
                      value={field.value}
                      onChangeText={field.setter}
                      placeholder={field.placeholder}
                      multiline={!!field.multiline}
                      style={field.height ? { height: field.height } : {}}
                    />
                  </View>
                ))}

                <View className="flex-row space-x-4 mb-4">
                  <View className="flex-1">
                    <Text className="text-sm font-medium text-slate-700 mb-1">Tahun Rilis</Text>
                    <TextInput
                      className="border border-gray-300 rounded-lg px-3 py-2"
                      keyboardType="numeric"
                      value={releaseYear}
                      onChangeText={setReleaseYear}
                      placeholder="2023"
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm font-medium text-slate-700 mb-1">Durasi (mnt)</Text>
                    <TextInput
                      className="border border-gray-300 rounded-lg px-3 py-2"
                      keyboardType="numeric"
                      value={duration}
                      onChangeText={setDuration}
                      placeholder="120"
                    />
                  </View>
                </View>

                {/* Trailer URL */}
                <View className="mb-4">
                  <Text className="text-sm font-medium text-slate-700 mb-1">URL Trailer</Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-3 py-2"
                    value={trailerUrl}
                    onChangeText={setTrailerUrl}
                    placeholder="https://youtube.com/..."
                  />
                </View>
              </View>

              {/* Buttons */}
              <View className="flex-row space-x-3 mt-6">
                <TouchableOpacity
                  onPress={onClose}
                  disabled={loading}
                  className="flex-1 border border-gray-300 py-3 rounded-lg items-center"
                >
                  <Text className="text-gray-600">Batal</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSubmit}
                  disabled={loading}
                  className="flex-1 bg-blue-600 py-3 rounded-lg items-center flex-row justify-center"
                >
                  {loading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text className="text-white font-semibold">Simpan</Text>
                  )}
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Success Dialog */}
      <Modal visible={successVisible} animationType="fade" transparent>
        <View className="flex-1 bg-black/50 justify-center items-center px-4">
          <View className="bg-white rounded-2xl p-6 w-full max-w-sm items-center">
            <Ionicons name="checkmark-circle" size={64} color="#34D399" />
            <Text className="text-xl font-bold text-slate-800 mt-4">Berhasil!</Text>
            <Text className="text-center text-gray-600 mt-2">Film telah ditambahkan.</Text>
            <TouchableOpacity
              onPress={handleSuccessClose}
              className="mt-6 bg-green-500 py-3 px-6 rounded-lg"
            >
              <Text className="text-white font-semibold">OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
