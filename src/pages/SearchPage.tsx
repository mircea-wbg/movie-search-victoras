import { useState, useEffect } from 'react';
import { searchMovies, getMovie } from '../api/movies';
import type { MovieDetails } from '../api/types';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import SearchBox from '../components/SearchBox';
import Grid from '../components/Grid';
import MovieCard from '../components/MovieCard';
import SkeletonCard from '../components/SkeletonCard';
import Pagination from '../components/Pagination';
import { useNavigate } from 'react-router-dom';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, 300);
  const [results, setResults] = useState<MovieDetails[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const MOVIES_PER_PAGE = 10;

  // Fetch rezultate când se schimbă debouncedQuery sau page
  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      setTotalPages(1);
      setPage(1);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setError('');

      try {
        // Caută filme cu OMDb
        const { results: searchResults, total } = await searchMovies(debouncedQuery, page);
        // Ia detalii complete pentru fiecare film
        const detailedResults = await Promise.all(searchResults.map((m) => getMovie(m.id)));

        setResults(detailedResults);
        setTotalPages(Math.ceil(total / MOVIES_PER_PAGE));
      } catch {
        setError('Nu am găsit niciun film care să corespundă căutării tale.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery, page]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">CAUTĂ FILMUL DORIT</h1>

      {/* Search input */}
      <div className="mb-6">
        <SearchBox value={query} onChange={setQuery} />
      </div>

      {/* Loading skeleton */}
      {loading && (
        <Grid>
          {Array.from({ length: MOVIES_PER_PAGE }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </Grid>
      )}

      {/* Error */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* No results */}
      {!loading && !error && results.length === 0 && debouncedQuery && (
        <p className="text-gray-400 mb-4">
          No movies found for "<span className="font-semibold">{debouncedQuery}</span>".
        </p>
      )}

      {/* Results */}
      {!loading && results.length > 0 && (
        <>
          <Grid>
            {results.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={() => navigate(`/movie/${movie.id}`)}
              />
            ))}
          </Grid>

          {/* Pagination */}
          <div className="mt-6">
            <Pagination current={page} total={totalPages} onPageChange={setPage} />
          </div>
        </>
      )}
    </div>
  );
}
