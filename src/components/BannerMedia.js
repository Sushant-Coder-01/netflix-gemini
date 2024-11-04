import { useDispatch } from "react-redux";
import useMovieVideo from "../hooks/useMovieVideo";
import { useEffect } from "react";
import { addBannerMovie } from "../redux/moviesSlice";

const BannerMedia = ({ movieId }) => {
  const dispatch = useDispatch();
  const trailerVideo = useMovieVideo(movieId);

  useEffect(() => {
    if (movieId) {
      dispatch(addBannerMovie(movieId));
    }
  }, [dispatch, movieId]);

  return (
    <div
      className="relative w-full h-0 overflow-hidden"
      style={{ paddingTop: "56.25%" /* 16:9 Aspect Ratio */ }}
    >
      <iframe
        className="absolute top-0 left-0 w-full h-full object-cover scale-[1.7] lg:scale-[2] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:left-1/2 lg:top-1/2"
        src={`https://www.youtube.com/embed/${trailerVideo?.key}?controls=0&showinfo=0&modestbranding=0&autoplay=1&mute=1&loop=1&playlist=${trailerVideo?.key}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        sandbox="allow-scripts allow-same-origin allow-presentation"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default BannerMedia;
