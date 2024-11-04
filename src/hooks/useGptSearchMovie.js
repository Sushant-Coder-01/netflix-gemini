import { useDispatch } from "react-redux";
import { GET_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { addSimilarMovie } from "../redux/moviesSlice";

const useGptSearchMovie = (gptGetSimilarMovieNames) => {
  const dispatch = useDispatch();

  const getGptSearchMovie = async () => {
    try {
      // Loop over each genre and its movie names in the array
      const genreMoviesMap = await Promise.all(
        gptGetSimilarMovieNames.map(async ([genre, movieNames]) => {
          const uniqueMovies = [...new Set(movieNames.filter(Boolean))]; // Remove duplicates and null values

          // Fetch movie data for each movie name under this genre
          const moviePromises = uniqueMovies.map((movieName) =>
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
              .then((data) => data.results || [])
          );

          // Wait for all movie data fetches to complete
          const moviesDataArray = await Promise.all(moviePromises);
          
          // Flatten results and filter out empty arrays
          const allMovies = moviesDataArray.flat().filter(Boolean);

          // Return an object with genre as the key and the movie data as value
          return { genre, movies: allMovies };
        })
      );

      // Dispatch all genres and their movies at once
      genreMoviesMap.forEach(({ genre, movies }) => {
        dispatch(addSimilarMovie({ genre, movies }));
      });

    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  useEffect(() => {
    if (gptGetSimilarMovieNames?.length > 0) {
      getGptSearchMovie();
    }
  }, [gptGetSimilarMovieNames]);
};

export default useGptSearchMovie;
