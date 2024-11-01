import { useSelector } from "react-redux";
import useSearchMovie from "../hooks/useSearchMovie";
import MovieList from "./MovieList";
import { MovieSuggestionsShimmer } from "./Shimmer";

const GptMovieSuggestions = ({ gptRecommandedMovies, searchMoviesInTMDB }) => {
  const searchBtnState = useSelector((store) => store.config.searchBtnState);

  useSearchMovie(gptRecommandedMovies);

  return (
    <div className="w-11/12 h-auto  bg-gray-600/40 absolute ml-20 mt-48 z-10 rounded-md">
      {searchBtnState && (
        <>
          <MovieSuggestionsShimmer />
          <MovieSuggestionsShimmer />
          <MovieSuggestionsShimmer />
          <MovieSuggestionsShimmer />
          <MovieSuggestionsShimmer />
        </>
      )}
      {searchMoviesInTMDB &&
        gptRecommandedMovies?.map((movieName, index) => (
          <MovieList
            key={index}
            title={movieName}
            movies={searchMoviesInTMDB[index]}
          />
        ))}
    </div>
  );
};

export default GptMovieSuggestions;
