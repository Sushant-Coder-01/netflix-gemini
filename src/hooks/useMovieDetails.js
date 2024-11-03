import { useDispatch } from "react-redux";
import { GET_OPTIONS } from "../utils/constants";
import { addMovieDetails } from "../redux/moviesSlice";
import { useEffect } from "react";

const useMovieDetails = (movieId) => {
  const dispatch = useDispatch();

  const getMovieDetails = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/" + movieId,
      GET_OPTIONS
    );

    const data = await response.json();

    const movieDetails = data;

    dispatch(addMovieDetails(movieDetails));
  };

  useEffect(() => {
    if (movieId) {
      getMovieDetails();
    }
  }, []);
};

export default useMovieDetails;
