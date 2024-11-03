import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {

  return (
    <div className="my-5 md:my-10 md:mx-4">
      <div className="text-white text-2xl mx-8 font-semibold">{title}</div>
      <div className="flex  mx-8 mr-7 my-3 overflow-x-scroll custom-scrollbar-horizontal">
        <div className="flex gap-4">
          {movies?.map((movie) => (
            <MovieCard
              key={movie?.id}
              id={movie?.id}
              posterPath={movie?.poster_path}
              title={movie.original_title}
              overview={movie.overview}
              avgVote={movie.vote_average}
              releaseDate={movie.release_date}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
