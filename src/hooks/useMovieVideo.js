import { useDispatch, useSelector } from "react-redux";
import { GET_OPTIONS } from "../utils/constants";
import { addMovieTrailer, addRelatedTrailers } from "../redux/moviesSlice";
import { useEffect } from "react";

const useMovieVideo = (movieId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getMovieVideos = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
          GET_OPTIONS
        );
        const data = await response.json();

        const relatedTrailers = data.results.filter((video) =>
          ["Trailer", "Teaser", "Clip"].includes(video?.type)
        );
        dispatch(addRelatedTrailers(relatedTrailers));

        const filteredData = data.results.filter(
          (video) => video?.type === "Trailer"
        );
        const trailer = filteredData.length ? filteredData[0] : data.results[0];
        dispatch(addMovieTrailer(trailer));
      } catch (error) {
        console.error("Error fetching movie videos:", error);
      }
    };

    if (movieId) {
      getMovieVideos();
    }
  }, [movieId, dispatch]);

  const trailerVideo = useSelector((store) => store.movies?.movieTrailer);
  return trailerVideo;
};

export default useMovieVideo;
