/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { MovieDetails } from '../api/types';

// Tipul contextului
type FavoritesContextType = {
  favorites: MovieDetails[];
  addFavorite: (movie: MovieDetails) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

// Creăm contextul cu default undefined pentru a forța folosirea provider-ului
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Hook custom pentru a folosi contextul
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within FavoritesProvider');
  return context;
}

// Provider
export function FavoritesProvider({ children }: { children: ReactNode }) {
  // Folosim hook-ul custom pentru localStorage
  const [favorites, setFavorites] = useLocalStorage<MovieDetails[]>('favorites', []);

  // Adaugă film în favorites
  const addFavorite = (movie: MovieDetails) => {
    if (!favorites.find((f) => f.id === movie.id)) {
      setFavorites([...favorites, movie]);
    }
  };

  // Elimină film din favorites
  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter((f) => f.id !== id));
  };

  // Verifică dacă filmul e deja favorit
  const isFavorite = (id: string) => favorites.some((f) => f.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
