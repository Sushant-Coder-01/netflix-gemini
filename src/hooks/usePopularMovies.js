import { useDispatch } from "react-redux";
import { GET_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../redux/moviesSlice";
import { useEffect } from "react";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  const getPopularMovies = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?page=1",
      GET_OPTIONS
    );
    const data = await response.json();
    console.log(data);

    dispatch(addPopularMovies(data.results));
  };

  useEffect(() => {
    getPopularMovies();
  }, []);
};

export default usePopularMovies;
