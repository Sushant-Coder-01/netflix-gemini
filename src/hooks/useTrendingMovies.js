import { useDispatch } from "react-redux";
import { GET_OPTIONS } from "../utils/constants";
import { addTrendingMovies } from "../redux/moviesSlice";
import { useEffect } from "react";

const useTrendingMovies = () => {
  const dispatch = useDispatch();

  const getTrendingMovies = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/trending/movie/day",
      GET_OPTIONS
    );
    const data = await response.json();

    dispatch(addTrendingMovies(data.results));
  };

  useEffect(() => {
    getTrendingMovies();
  }, []);
};

export default useTrendingMovies;
