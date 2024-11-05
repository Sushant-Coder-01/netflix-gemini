import { useDispatch } from "react-redux";
import { GET_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { addSimilarMovie } from "../redux/moviesSlice";

const useGptSearchMovie = (gptGetSimilarMovieNames) => {
  const dispatch = useDispatch();

  const getGptSearchMovie = async () => {
    try {
      const genreMoviesMap = await Promise.all(
        gptGetSimilarMovieNames?.map(async ({ genre, movies }) => {
          const moviePromises = movies?.map((movieName) =>
            fetch(
              `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
                movieName
              )}&include_adult=false&page=1`,
              GET_OPTIONS
            )
              .then((response) => {
                if (!response.ok) {
                  console.error(
                    "Fetch error:",
                    response.status,
                    response.statusText
                  );
                  throw new Error("Network response was not ok");
                }
                return response.json();
              })
              .then((data) => data.results)
          );

          const moviesDataArray = await Promise.all(moviePromises);

          const allMovies = moviesDataArray.flat().filter(Boolean);

          return { genre, movies: allMovies };
        })
      );

      genreMoviesMap?.forEach(({ genre, movies }) => {
        dispatch(addSimilarMovie({ genre, movies }));
      });
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  useEffect(() => {
    if (gptGetSimilarMovieNames) {
      getGptSearchMovie();
    }
  }, []);
};

export default useGptSearchMovie;
