export type MovieCard = {
  id: string;
  title: string;
  year: string;
  posterUrl: string | null;
};

export type MovieDetails = MovieCard & {
  genres: string[];
  runtimeMins: number | null;
  plot: string | null;
  ratings: { source: string; value: string }[];
};
