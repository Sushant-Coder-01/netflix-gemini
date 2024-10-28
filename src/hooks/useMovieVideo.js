import { useDispatch, useSelector } from "react-redux";
import { GET_OPTIONS } from "../utils/constants";
import { addMovieTrailer } from "../redux/moviesSlice";
import { useEffect } from "react";

const useMovieVideo = (movieId) => {
  const dispatch = useDispatch();

  const getMovieVideos = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      GET_OPTIONS
    );

    const data = await response.json();

    const filterdData = data.results.filter(
      (video) => video?.type === "Trailer"
    );

    const trailer = filterdData.length ? filterdData[0] : data.results[0];
    dispatch(addMovieTrailer(trailer));
  };

  useEffect(() => {
    if (movieId) {
      getMovieVideos();
    }
  }, []);

  const trailerVideo = useSelector((store) => store.movies?.movieTrailer);
  return trailerVideo;
};

export default useMovieVideo;
