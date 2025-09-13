import type { MovieCard, MovieDetails } from './types';

const API_KEY = 'e201c59d';
const BASE_URL = 'https://www.omdbapi.com/';

// Tipuri pentru API-ul OMDb
type OMDbSearchItem = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
};

type OMDbDetails = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Genre: string;
  Runtime: string;
  Plot: string;
  Ratings: { Source: string; Value: string }[];
};

async function fetchFromOMDb(params: Record<string, string>) {
  const url = new URL(BASE_URL);
  url.searchParams.append('apikey', API_KEY);
  for (const key in params) {
    url.searchParams.append(key, params[key]);
  }

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Network response was not ok');

  const data = await res.json();
  if (data.Error) throw new Error(data.Error);

  return data;
}

export async function searchMovies(
  q: string,
  page: number
): Promise<{ results: MovieCard[]; total: number }> {
  const data = await fetchFromOMDb({ s: q, page: page.toString() });

  const results: MovieCard[] =
    data.Search?.map((item: OMDbSearchItem) => ({
      id: item.imdbID,
      title: item.Title,
      year: item.Year,
      posterUrl: item.Poster !== 'N/A' ? item.Poster : null,
    })) || [];

  const total = parseInt(data.totalResults || '0', 10);

  return { results, total };
}

export async function getMovie(id: string): Promise<MovieDetails> {
  const data: OMDbDetails = await fetchFromOMDb({ i: id, plot: 'full' });

  return {
    id: data.imdbID,
    title: data.Title,
    year: data.Year,
    posterUrl: data.Poster !== 'N/A' ? data.Poster : null,
    genres: data.Genre ? data.Genre.split(',').map((g) => g.trim()) : [],
    runtimeMins:
      data.Runtime && data.Runtime !== 'N/A'
        ? parseInt(data.Runtime)
        : null,
    plot: data.Plot !== 'N/A' ? data.Plot : null,
    ratings: data.Ratings?.map((r) => ({
      source: r.Source,
      value: r.Value,
    })) || [],
  };
}
