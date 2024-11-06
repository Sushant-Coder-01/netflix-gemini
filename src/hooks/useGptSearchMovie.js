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

          // Flatten the array and filter out duplicates by movie ID
          const allMovies = moviesDataArray.flat().filter(Boolean);

          // Use a Map to keep only unique movies based on their ID
          const uniqueMoviesMap = new Map();
          allMovies.forEach((movie) => {
            if (!uniqueMoviesMap.has(movie.id)) {
              uniqueMoviesMap.set(movie.id, movie);
            }
          });

          // Get the unique movies array from the Map
          const uniqueMovies = Array.from(uniqueMoviesMap.values());

          return { genre, movies: uniqueMovies };
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
  }, [gptGetSimilarMovieNames]);
};

export default useGptSearchMovie;
