import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { useMoviesStore } from '@/store/moviesStore';
import { MovieCard } from './index'; // Reuse the MovieCard component

export default function FavoritesScreen() {
  const { favorites } = useMoviesStore();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {favorites.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>No favorites added yet.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.imdbID || 'unknown-id'}
          renderItem={({ item }) => <MovieCard movie={item} isFeatured={false} />}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      )}
    </View>
  );
}