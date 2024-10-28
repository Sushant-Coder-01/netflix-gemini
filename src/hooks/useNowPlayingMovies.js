import { useDispatch } from "react-redux";
import { GET_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../redux/moviesSlice";
import { useEffect } from "react";

const useNowPlayingMovies = () => {

  const dispatch = useDispatch();

  const getNowPlayingMovies = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      GET_OPTIONS
    );
    const data = await response.json();
    
    dispatch(addNowPlayingMovies(data.results));
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);

};

export default useNowPlayingMovies;