import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Movie } from './moviesStore';

interface AuthState {
  isLoggedIn: boolean;
  username: string | null;
  accessToken: string | null;
  login: (username: string, accessToken: string) => void;
  logout: () => void;
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      username: null,
      accessToken: null,
      login: (username, accessToken) =>
        set({
          isLoggedIn: true,
          username,
          accessToken,
        }),
      logout: () =>
        set({
          isLoggedIn: false,
          username: null,
          accessToken: null,
        }),
      favorites: [], // List of favorited movies
      addFavorite: (movie) =>
        set((state) => ({
          favorites: [...state.favorites, movie],
        })),
      removeFavorite: (movieId) =>
        set((state) => ({
          favorites: state.favorites.filter((movie) => movie.imdbID !== movieId),
        })),
    }),
    {
      name: 'auth-storage', // Name of the storage key
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      }, // Custom storage wrapper for React Native
    }
  )
);