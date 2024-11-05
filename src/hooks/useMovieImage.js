import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMoviesLogo } from "../redux/moviesSlice";
import { GET_OPTIONS } from "../utils/constants";

const useMovieImage = (movieId) => {
  const dispatch = useDispatch();

  // const moviesLogo = useSelector(store => store.movies.moviesLogo);

  const fetchMovieImage = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/images?include_image_language=en`,
        GET_OPTIONS
      );
      const data = await response.json();
      if (data?.logos?.length > 0) {
        dispatch(addMoviesLogo(data.logos[0]));
      }
    } catch (error) {
      console.error("Failed to fetch movie image:", error);
    }
  };

  useEffect(() => {
    if (movieId) {
      fetchMovieImage();
    }
  }, [movieId]);

  const image = useSelector((store) => store.movies?.moviesLogo);
  return image?.file_path;
};

export default useMovieImage;
