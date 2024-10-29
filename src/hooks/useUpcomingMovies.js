import { useDispatch } from "react-redux";
import { GET_OPTIONS } from "../utils/constants";
import { addUpcomingMovies } from "../redux/moviesSlice";
import { useEffect } from "react";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();

  const getUpcomingMovies = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?page=1",
      GET_OPTIONS
    );
    const data = await response.json();
    console.log(data);

    dispatch(addUpcomingMovies(data.results));
  };

  useEffect(() => {
    getUpcomingMovies();
  }, []);
};

export default useUpcomingMovies;
