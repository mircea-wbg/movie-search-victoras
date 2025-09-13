import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovie } from '../api/movies';
import type { MovieDetails } from '../api/types';
import { useFavorites } from '../context/FavoritesContext';

export default function DetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError('');

    getMovie(id)
      .then((data) => setMovie(data))
      .catch(() => setError('Failed to fetch movie details. Retry later.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-gray-400">Loading movie details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!movie) return null;

  const fav = isFavorite(movie.id);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded shadow text-white">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Poster */}
        <img
          src={movie.posterUrl || '/placeholder.png'}
          alt={movie.title}
          className="w-full md:w-64 h-auto object-cover rounded"
        />

        {/* Details */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-400 mb-2">{movie.year} • {movie.runtimeMins ? `${movie.runtimeMins} mins` : 'N/A'}</p>
          <p className="mb-2">
            Genres: {movie.genres.length > 0 ? movie.genres.join(', ') : 'N/A'}
          </p>

          <p className="mb-4">{movie.plot || 'No plot available.'}</p>

          {/* Ratings */}
          {movie.ratings.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold mb-1">Ratings:</h3>
              <ul className="list-disc list-inside">
                {movie.ratings.map((r) => (
                  <li key={r.source}>{r.source}: {r.value}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Favorite button */}
          <button
            onClick={() => (fav ? removeFavorite(movie.id) : addFavorite(movie))}
            className={`px-4 py-2 rounded ${
              fav ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
            } transition-colors`}
          >
            {fav ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>
      </div>
    </div>
  );
}
