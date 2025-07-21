// screens/admin/EditFilmScreen.tsx

import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { updateFilm } from '../../services/filmServices';
import { Film } from '../../types/film';

interface Props {
  visible: boolean;
  onClose: () => void;
  film: Film;
  onUpdated: () => void;
}

export default function EditFilmScreen({ visible, onClose, film, onUpdated }: Props) {
  const [title, setTitle] = useState(film.title);
  const [genre, setGenre] = useState(film.genre || '');
  const [releaseYear, setReleaseYear] = useState(String(film.releaseYear || ''));
  const [duration, setDuration] = useState(String(film.duration || ''));
  const [trailerUrl, setTrailerUrl] = useState(film.trailerUrl || '');
  const [description, setDescription] = useState(film.description || '');
  const [posterUri, setPosterUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  useEffect(() => {
    setTitle(film.title);
    setGenre(film.genre || '');
    setReleaseYear(String(film.releaseYear || ''));
    setDuration(String(film.duration || ''));
    setTrailerUrl(film.trailerUrl || '');
    setDescription(film.description || '');
    setPosterUri(null);
    setUploading(false);
    setSuccessVisible(false);
  }, [film, visible]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      return Alert.alert('Izin ditolak', 'Kami membutuhkan akses galeri untuk memilih poster.');
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!result.canceled) {
      // @ts-ignore
      const uri = result.assets?.[0]?.uri ?? result.uri;
      setPosterUri(uri);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim()) return Alert.alert('Error', 'Judul tidak boleh kosong');
    setUploading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('genre', genre);
    formData.append('release_year', releaseYear);
    formData.append('duration', duration);
    formData.append('trailerUrl', trailerUrl);
    formData.append('description', description);

    if (posterUri) {
      const filename = posterUri.split('/').pop()!;
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : 'image';
      formData.append('poster', { uri: posterUri, name: filename, type } as any);
    }

    try {
      await updateFilm(film.id, formData);
      setSuccessVisible(true);
    } catch (err: any) {
      console.error(err.response || err);
      Alert.alert('Error', err.response?.data?.message || 'Gagal memperbarui film');
    } finally {
      setUploading(false);
    }
  };

  const handleSuccessClose = () => {
    setSuccessVisible(false);
    onUpdated();
    onClose();
  };

  return (
    <>
      <Modal visible={visible} animationType="slide" transparent>
        <View className="flex-1 bg-black/50 justify-center px-4">
          <View className="bg-white rounded-2xl p-5 max-h-[90%]">
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text className="text-2xl font-bold text-center text-slate-800 mb-5">Edit Film</Text>

              {/* Poster Preview + Overlay Icon */}
              <TouchableOpacity onPress={pickImage} className="self-center mb-5" activeOpacity={0.8}>
                <View className="relative">
                  <Image
                    source={{ uri: posterUri || film.posterUrl }}
                    className="w-36 h-52 rounded-xl bg-gray-100"
                    resizeMode="cover"
                  />
                  <View className="absolute inset-0 bg-black/20 rounded-xl flex-row justify-center items-center">
                    <Ionicons name="camera" size={32} color="white" />
                  </View>
                </View>
              </TouchableOpacity>

              {/* Form Fields */}
              {[
                { label: 'Judul', value: title, setter: setTitle, placeholder: 'Judul film' },
                { label: 'Genre', value: genre, setter: setGenre, placeholder: 'Aksi, Drama, dll' },
              ].map((field) => (
                <View key={field.label} className="mb-4">
                  <Text className="text-sm font-medium text-slate-700 mb-1">{field.label}</Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-3 py-2"
                    value={field.value}
                    onChangeText={field.setter}
                    placeholder={field.placeholder}
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

              <View className="mb-4">
                <Text className="text-sm font-medium text-slate-700 mb-1">URL Trailer</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg px-3 py-2"
                  value={trailerUrl}
                  onChangeText={setTrailerUrl}
                  placeholder="https://..."
                />
              </View>

              <View className="mb-5">
                <Text className="text-sm font-medium text-slate-700 mb-1">Deskripsi</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg px-3 py-2 h-24 text-sm"
                  value={description}
                  onChangeText={setDescription}
                  multiline
                />
              </View>

              {/* Buttons */}
              <View className="flex-row space-x-3">
                <TouchableOpacity
                  onPress={handleSubmit}
                  disabled={uploading}
                  className="flex-1 bg-blue-600 py-3 rounded-lg items-center flex-row justify-center"
                >
                  {uploading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text className="text-white font-semibold">Simpan</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onClose}
                  disabled={uploading}
                  className="flex-1 border border-gray-300 py-3 rounded-lg items-center"
                >
                  <Text className="text-gray-600">Batal</Text>
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
            <Text className="text-center text-gray-600 mt-2">Film berhasil diperbarui.</Text>
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
