import React from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { Film } from '../../types/film';

interface Props {
  visible: boolean;
  onClose: () => void;
  film: Film;
}

export default function DetailFilmScreen({ visible, onClose, film }: Props) {
  const openTrailer = () => {
    if (film.trailerUrl) {
      Linking.openURL(film.trailerUrl).catch(() =>
        alert('Gagal membuka link trailer.')
      );
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 justify-center items-center bg-black/40 px-4">
        <View className="bg-white w-full rounded-2xl p-4 max-h-[90%]">
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Gambar Poster */}
            <Image
              source={{ uri: film.posterUrl }}
              className="w-full h-64 rounded-xl bg-gray-200 mb-4"
              resizeMode="cover"
            />

            {/* Judul Film */}
            <Text className="text-2xl font-bold text-slate-800 mb-2">
              {film.title}
            </Text>

            {/* Informasi Genre dan Tahun */}
            <View className="mb-3">
              <Text className="text-base text-gray-600">
                <Text className="font-semibold text-slate-700">Genre:</Text> {film.genre || 'Tidak diketahui'}
              </Text>
              <Text className="text-base text-gray-600">
                <Text className="font-semibold text-slate-700">Tahun Rilis:</Text> {film.releaseYear || '-'}
              </Text>
              <Text className="text-base text-gray-600">
                <Text className="font-semibold text-slate-700">Durasi:</Text> {film.duration ? `${film.duration} menit` : '-'}
              </Text>
              <Text className="text-base text-gray-600">
                <Text className="font-semibold text-slate-700">Views:</Text> {film.views}
              </Text>
            </View>

            {/* Deskripsi */}
            <View className="mb-3">
              <Text className="text-base font-semibold text-slate-700 mb-1">Deskripsi:</Text>
              <Text className="text-sm text-gray-700 leading-relaxed">
                {film.description || 'Tidak ada deskripsi tersedia.'}
              </Text>
            </View>

            {/* Trailer (Jika Ada) */}
            {film.trailerUrl && (
              <TouchableOpacity
                className="mt-2 py-2 px-4 bg-red-600 rounded-xl items-center"
                onPress={openTrailer}
              >
                <Text className="text-white font-semibold">Tonton Trailer</Text>
              </TouchableOpacity>
            )}
          </ScrollView>

          {/* Tombol Tutup */}
          <TouchableOpacity
            onPress={onClose}
            className="mt-4 bg-gray-800 py-3 rounded-xl items-center"
          >
            <Text className="text-white text-base font-semibold">Tutup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
