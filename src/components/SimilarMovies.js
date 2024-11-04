import { useSelector } from "react-redux";
import useGptSearchMovie from "../hooks/useGptSearchMovie";
import { MovieSuggestionsShimmer } from "./Shimmer";
import MovieList from "./MovieList";

const SimilarMovies = () => {
  const gptGetSimilarMovieNames = useSelector(
    (store) => store.gpt.gptGetSimilarMovieNames
  );

  const genres = useSelector((store) => store.movies.genres);
  const similarMovies = useSelector((store) => store.movies.similarMovie);

  useGptSearchMovie(gptGetSimilarMovieNames);

  return (
    <div className="w-11/12 h-auto  bg-gray-600/40 absolute ml-5 md:ml-20 mt-48 z-10 rounded-md">
      {
        <>
          <MovieSuggestionsShimmer />
        </>
      }
      {similarMovies &&
        genres?.map((genre, index) => (
          <MovieList key={index} title={genre} movies={similarMovies[index]} />
        ))}
    </div>
  );
};

export default SimilarMovies;
