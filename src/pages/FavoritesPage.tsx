import { useState } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import type { MovieDetails } from '../api/types';
import MovieCard from '../components/MovieCard';
import Grid from '../components/Grid';
import { useNavigate } from 'react-router-dom';

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();
  const [sortBy, setSortBy] = useState<'title' | 'year'>('title');
  const [filterGenre, setFilterGenre] = useState('');
  const navigate = useNavigate();

  // Eliminăm duplicatele după id
  const uniqueFavorites = Array.from(
    new Map(favorites.map((movie) => [movie.id, movie])).values()
  );

  // Aplicăm filter + sort
  const filtered = uniqueFavorites
    .filter((movie) => !filterGenre || movie.genres.includes(filterGenre))
    .sort((a, b) =>
      sortBy === 'title' ? a.title.localeCompare(b.title) : a.year.localeCompare(b.year)
    );

  // Toate genurile pentru dropdown
  const allGenres = Array.from(new Set(uniqueFavorites.flatMap((movie) => movie.genres)));

  return (
    <div className="flex flex-col gap-6 p-4">
      <h1 className="text-3xl font-bold mb-4">FILMELE MELE</h1>

      {/* Sort + Filter */}
      <div className="flex gap-4 mb-4">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'title' | 'year')}
          className="border p-2 rounded"
        >
          <option value="title">Titlu (alfabetic)</option>
          <option value="year">An (vechi la nou)</option>
        </select>

        <select
          value={filterGenre}
          onChange={(e) => setFilterGenre(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Filtrează după gen</option>
          {allGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p>Nu ai niciun film în lista de favorite.</p>
      ) : (
        <Grid className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {filtered.map((movie: MovieDetails, idx) => (
            <MovieCard
              key={`${movie.id}-${idx}`} // asigură unicitate chiar dacă id-ul se repetă
              movie={movie}
              onClick={() => navigate(`/movie/${movie.id}`)}
              onRemove={() => removeFavorite(movie.id)}
              isFavorite={true} // afișează tag "Fav"
            />
          ))}
        </Grid>
      )}
    </div>
  );
}
