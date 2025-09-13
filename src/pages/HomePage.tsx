import { useEffect, useState } from 'react';
import { searchMovies, getMovie } from '../api/movies';
import type { MovieDetails } from '../api/types';
import Grid from '../components/Grid';
import MovieCard from '../components/MovieCard';
import SkeletonCard from '../components/SkeletonCard';
import Pagination from '../components/Pagination';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [movies, setMovies] = useState<MovieDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const MOVIES_PER_PAGE = 10;

  useEffect(() => {
    setLoading(true);
    setError('');

    searchMovies('batman', page)
      .then(async ({ results, total }) => {
        // Fetch detalii complete pentru fiecare film
        const detailedResults = await Promise.all(results.map((m) => getMovie(m.id)));
        setMovies(detailedResults);
        setTotalPages(Math.ceil(total / MOVIES_PER_PAGE));
      })
      .catch(() => setError('Failed to fetch movies. Retry later.'))
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div className="flex flex-col gap-6 p-4">
      <h1 className="text-3xl font-bold mb-4">FILME RECOMANDATE</h1>

      {loading ? (
        <Grid className="grid grid-cols-5 gap-1">
          {Array.from({ length: MOVIES_PER_PAGE }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </Grid>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <Grid className="grid grid-cols-5 gap-1">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={() => navigate(`/movie/${movie.id}`)}
              />
            ))}
          </Grid>

          <div className="mt-4">
            <Pagination current={page} total={totalPages} onPageChange={setPage} />
          </div>
        </>
      )}
    </div>
  );
}
