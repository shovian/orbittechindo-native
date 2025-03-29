import { create } from 'zustand';

export interface Movie {
  imdbID?: string;
  Title?: string;
  Year?: string;
  Poster?: string;
}

interface MoviesStore {
  movies: Movie[];
  favorites: Movie[];
  setMovies: (movies: Movie[]) => void;
  addFavorite: (movie: Movie) => void;
  removeFavorite: (imdbID: string) => void;
}

export const useMoviesStore = create<MoviesStore>((set) => ({
  movies: [],
  favorites: [],
  setMovies: (movies) => set({ movies }),
  addFavorite: (movie) =>
    set((state) => ({
      favorites: [...state.favorites, movie],
    })),
  removeFavorite: (imdbID) =>
    set((state) => ({
      favorites: state.favorites.filter((movie) => movie.imdbID !== imdbID),
    })),
}));
