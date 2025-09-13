import { useRef, useState, useEffect } from 'react';
import type { MouseEventHandler } from 'react';
import type { MovieCard as MovieCardType, MovieDetails } from '../api/types';

type MovieCardProps = {
  movie: MovieCardType | MovieDetails;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onRemove?: () => void;
  isFavorite?: boolean;
};

// Type guard pentru MovieDetails
function isMovieDetails(movie: MovieCardType | MovieDetails): movie is MovieDetails {
  return (movie as MovieDetails).genres !== undefined;
}

export default function MovieCard({
  movie,
  onClick,
  onRemove,
  isFavorite,
}: MovieCardProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);
  const [hoverCard, setHoverCard] = useState(false); // state hover pe card

  useEffect(() => {
    if (titleRef.current) {
      setIsTruncated(titleRef.current.scrollWidth > titleRef.current.clientWidth);
    }
  }, [movie.title]);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHoverCard(true)}
      onMouseLeave={() => setHoverCard(false)}
      className="cursor-pointer border border-gray-700 rounded-lg overflow-hidden bg-gray-800 shadow hover:scale-105 transition-transform duration-200 relative"
    >
      {/* Poster */}
      <div className="w-full aspect-[2/3] bg-gray-700 overflow-hidden">
        <img
          src={movie.posterUrl || '/placeholder.png'}
          alt={movie.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            target.src = '/placeholder.png';
            target.classList.add('blur-sm');
          }}
        />
      </div>

      {/* Text */}
      <div className="p-3 space-y-1 relative">
        <h3
          ref={titleRef}
          className="font-semibold truncate"
          tabIndex={0}
          aria-label={movie.title}
        >
          {movie.title}
        </h3>

        <p className="movie-year"><b>{movie.year}</b></p>

        {/* Genres și Runtime */}
        {isMovieDetails(movie) && (
          <>
            {movie.genres && (
              <p className="movie-gen"><b>Gen:</b> {movie.genres.join(', ')}</p>
            )}
            {movie.runtimeMins && (
              <p className="movie-time"><b>Durată:</b> {movie.runtimeMins} minute</p>
            )}
            {movie.plot && (
              <p className="movie-plot">{movie.plot}</p>
            )}

            {/* Ratings - stelute dinamice cu tooltip separat */}
            {movie.ratings && movie.ratings.length > 0 && (
              <div className="relative inline-block mt-1">
                <div className="group inline-block cursor-default select-none">
                  {(() => {
                    const imdbRating = movie.ratings.find(
                      (r) => r.source === 'Internet Movie Database'
                    );
                    const score = imdbRating ? parseFloat(imdbRating.value.split('/')[0]) : 0;
                    const fullStars = Math.floor(score / 2);
                    const halfStar = score / 2 - fullStars >= 0.5;
                    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

                    return (
                      <span className="movie-rating">
                        {'★'.repeat(fullStars)}
                        {halfStar ? '⯪' : ''}
                        {'☆'.repeat(emptyStars)}
                      </span>
                    );
                  })()}

                  {/* Tooltip apare doar la hover pe stelute */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max rounded bg-gray-900 text-white text-xs px-2 py-1 opacity-0 shadow-lg transition-opacity duration-150
                                  group-hover:opacity-100 z-50 pointer-events-auto">
                    {movie.ratings.map((r) => (
                      <div key={r.source}>
                        {r.source}: {r.value}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Tooltip titlu complet la hover pe card */}
        {isTruncated && hoverCard && (
          <div className="absolute left-0 top-0 mt-0 max-w-[18rem] w-max rounded bg-gray-900 text-white text-xs px-2 py-1 shadow-lg z-50">
            {movie.title}
          </div>
        )}
      </div>

      {/* Remove button */}
      {onRemove && (
        <div className="absolute top-2 right-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="p-1 rounded bg-red-600 hover:bg-red-700 text-white text-sm"
          >
            🗑
          </button>
        </div>
      )}

      {/* Favorite tag */}
      {isFavorite && !onRemove && (
        <span className="absolute top-2 right-2 px-2 py-1 bg-blue-600 text-white rounded text-sm">
          Fav
        </span>
      )}
    </div>
  );
}
