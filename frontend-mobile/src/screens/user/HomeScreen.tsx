import React from 'react';
import { View } from 'react-native';
import AllFilms from './AllFilms';
import Favorit from './FavoritFilms';

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-gray-100 px-6 pt-10">
      <Favorit />
      <AllFilms />
    </View>
  );
}
