import { useDispatch } from "react-redux";
import { GET_OPTIONS } from "../utils/constants";
import { addSearchMoviesInTMDB } from "../redux/gptSlice";
import { useEffect } from "react";

const useSearchMovie = (gptRecommandedMovies) => {
  const dispatch = useDispatch();

  const getSearchMovies = async () => {
    try {

      const uniqueMovies = [...new Set(gptRecommandedMovies.filter(Boolean))];

      const promises = uniqueMovies.map((movieName) =>
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
          .then((data) => {
            return data.results;
          })
      );

      const moviesDataArray = await Promise.all(promises);

      const allMovies = moviesDataArray.filter(Boolean);
      dispatch(addSearchMoviesInTMDB(allMovies));
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  useEffect(() => {
    if (gptRecommandedMovies?.length > 0) {
      getSearchMovies();
    }
  }, [gptRecommandedMovies]);
};

export default useSearchMovie;
