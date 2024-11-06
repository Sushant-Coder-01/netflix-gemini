import { useDispatch, useSelector } from "react-redux";
import useGptSearchMovie from "../hooks/useGptSearchMovie";
import MovieList from "./MovieList";
import { useEffect } from "react";
import { cleanSimilarMovie } from "../redux/moviesSlice";

const SimilarMovies = () => {

  const gptGetSimilarMovieNames = useSelector(
    (store) => store.gpt.gptGetSimilarMovieNames
  );

  const similarMovies = useSelector((store) => store.movies.genreMovies);
  const dispatch = useDispatch();

  useGptSearchMovie(gptGetSimilarMovieNames);

  useEffect(() => {
    return () => dispatch(cleanSimilarMovie());
  }, [gptGetSimilarMovieNames]);

  if (!similarMovies) return;

  return (
    <div>
      {Object.keys(similarMovies).length > 0 &&
        Object.keys(similarMovies)?.map((genere, index) => (
          <MovieList
            key={index}
            title={genere}
            movies={similarMovies[genere]}
          />
        ))}
    </div>
  );
};

export default SimilarMovies;
