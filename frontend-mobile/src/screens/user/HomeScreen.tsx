import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { getAllFilms } from '../../services/filmServices';
import { Film } from '../../types/film';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const [films, setFilms] = useState<Film[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const res = await getAllFilms();
        setFilms(res);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFilms();
  }, []);

  const renderItem = ({ item }: { item: Film }) => (
    <TouchableOpacity
      className="flex-row bg-white rounded-xl shadow-md mb-4 overflow-hidden"
      onPress={() => navigation.navigate('Detail' as never, { id: item.id } as never)}
    >
      <Image
        source={{ uri: item.poster }}
        className="w-24 h-36"
        resizeMode="cover"
      />
      <View className="flex-1 p-4">
        <Text className="text-lg font-semibold">{item.title}</Text>
        <Text className="text-gray-600 mt-1" numberOfLines={2}>{item.description}</Text>
        <Text className="text-sm text-gray-400 mt-2">{item.views} views</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold mb-4">Film Populer</Text>
      <FlatList
        data={films}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
