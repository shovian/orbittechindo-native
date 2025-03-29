
import React, { useState, useEffect, memo } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Movie, useMoviesStore } from '@/store/moviesStore';
import styles from '../styles';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '@/store/authStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchMovies } from '../api/movies';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'movie' | 'series' | ''>('movie');
  const [shouldFetch, setShouldFetch] = useState(false);
  const { logout, isLoggedIn } = useAuthStore();
  const { movies, setMovies } = useMoviesStore();
  const [startYear, setStartYear] = useState<string | undefined>(undefined);
  const [endYear, setEndYear] = useState<string | undefined>(undefined);
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ['movies', searchQuery, filterType, startYear, endYear],
    queryFn: () =>
      fetchMovies({

        search: searchQuery,
        type: filterType,
        startYear,
        endYear,
      }),
    enabled: shouldFetch,
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isLoggedIn && isMounted) {
      router.replace('/login');
    }
  }, [isLoggedIn, router, isMounted]);

  useEffect(() => {
    if (data) {
      setMovies(data);
    }
    if (!shouldFetch) {
      setShouldFetch(false);
    }
  }, [data, setMovies, shouldFetch]);

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      setShouldFetch(true);
    }
  };

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>🎬 Movie Explorer</Text>
      </View>
      <FeaturedMovies movies={movies} />

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearch={handleSearch} />
      <FilterBar
        filterType={filterType}
        setFilterType={setFilterType}
        startYear={startYear}
        setStartYear={setStartYear}
        endYear={endYear}
        setEndYear={setEndYear}
      />
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.errorText}>Failed to fetch movies. Try again later.</Text>}
      {!isLoading && !error && movies.length === 0 && (
        <Text style={styles.emptyText}>No movies found. Try a different search.</Text>
      )}
      <MovieList movies={movies} />
=
    </View>
  );
}

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery, onSearch }) => {
  const { logout } = useAuthStore();

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for movies..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <TouchableOpacity style={styles.searchButton} onPress={onSearch}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

interface FilterBarProps {
  filterType: 'movie' | 'series' | '';
  setFilterType: (type: 'movie' | 'series' | '') => void;
  startYear?: string;
  setStartYear: (year: string | undefined) => void;
  endYear?: string;
  setEndYear: (year: string | undefined) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filterType,
  setFilterType,
  startYear,
  setStartYear,
  endYear,
  setEndYear,
}) => {
  return (
    <View style={styles.filtersContainer}>
      <Text>Type:</Text>
      <TouchableOpacity onPress={() => setFilterType('movie')}>
        <Text style={filterType === 'movie' ? styles.selectedFilter : styles.filterText}>
          Movie
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setFilterType('series')}>
        <Text style={filterType === 'series' ? styles.selectedFilter : styles.filterText}>
          Series
        </Text>
      </TouchableOpacity>
      <TextInput
        style={styles.yearInput}
        placeholder="Start Year"
        keyboardType="numeric"
        value={startYear}
        onChangeText={setStartYear}
      />
      <TextInput
        style={styles.yearInput}
        placeholder="End Year"
        keyboardType="numeric"
        value={endYear}
        onChangeText={setEndYear}
      />
    </View>
  );
};

interface FeaturedMoviesProps {
  movies: Movie[];
}

interface MovieListProps {
  movies: Movie[];
}

const FeaturedMovies: React.FC<FeaturedMoviesProps> = ({ movies }) => {
  return (
    <FlatList
      data={movies.slice(0, 5)}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.imdbID || Math.random().toString()}
      renderItem={({ item }) => <MovieCard movie={item} isFeatured />}
      contentContainerStyle={[styles.carousel, { flexGrow: 1 }]}
    />
  );
};

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  const router = useRouter();

  const renderMovieCard = ({ item, index }: { item: Movie; index: number }) => {
    const translateY = index % 2 !== 0 ? 70 : 0;

    return (
      <TouchableOpacity
        style={[styles.masonryItem, { transform: [{ translateY }] }]}
        onPress={() => router.push({ pathname: '/movie-details', params: { movie: JSON.stringify(item) } })}
      >
        <MovieCard movie={item} isFeatured={false} />
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={movies}
      keyExtractor={(item) => item.imdbID || `${item.Title}-${Math.random()}`}
      renderItem={renderMovieCard}
      numColumns={2}
      contentContainerStyle={styles.masonryGrid}
      nestedScrollEnabled={true}
      initialNumToRender={10}
      windowSize={5}
    />
  );
};

interface MovieCardProps {
  movie: Movie;
  isFeatured: boolean;
}

export const MovieCard: React.FC<MovieCardProps> = memo(({ movie, isFeatured }) => {
  const { favorites, addFavorite, removeFavorite } = useMoviesStore();
  const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

  const toggleFavorite = () => {
    if (isFavorite) {
      if (movie.imdbID) {
        removeFavorite(movie.imdbID);
      }
    } else {
      if (movie.imdbID) {
        addFavorite(movie);
      }
    }
  };

  return (
    <View style={[styles.movieCard, isFeatured && styles.featuredMovieCard]}>
      <Image source={{ uri: movie.Poster }} style={styles.poster} />
      {!isFeatured && (
        <View style={styles.movieInfoContainer}>
          <Text style={styles.movieTitle}>{movie.Title}</Text>
          <Text style={styles.movieYear}>{movie.Year}</Text>
          <TouchableOpacity onPress={toggleFavorite}>
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite ? 'red' : 'gray'}
            />
          </TouchableOpacity>
        </View>
      )}
      {isFeatured && (
        <View style={styles.overlay}>
          <Text style={styles.featuredMovieTitle}>{movie.Title}</Text>
        </View>
      )}
    </View>
  );
});