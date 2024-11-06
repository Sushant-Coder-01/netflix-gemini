import { useDispatch } from "react-redux";
import useMovieVideo from "../hooks/useMovieVideo";
import { useEffect, useState } from "react";
import { addBannerMovie } from "../redux/moviesSlice";
import { MUTE_ICON, UNMUTE_ICON } from "../utils/constants";

const BannerMedia = ({ movieId }) => {
  const dispatch = useDispatch();
  const trailerVideo = useMovieVideo(movieId);
  const [isMuted, setIsMuted] = useState(true); // Initialize mute state

  useEffect(() => {
    if (movieId) {
      dispatch(addBannerMovie(movieId));
    }
  }, [movieId, dispatch]);

  const toggleMute = () => {
    setIsMuted((prevMute) => !prevMute);
  };

  return (
    <div
      className="relative w-full h-0 overflow-hidden"
      style={{ paddingTop: "56.25%" /* 16:9 Aspect Ratio */ }}
    >
      <iframe
        className="absolute top-0 left-0 w-full h-full object-cover scale-[1.7] lg:scale-[2] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:left-1/2 lg:top-1/2"
        src={`https://www.youtube.com/embed/${
          trailerVideo?.key
        }?controls=0&showinfo=0&modestbranding=0&autoplay=1&mute=${
          isMuted ? 1 : 0
        }&loop=1&playlist=${trailerVideo?.key}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        sandbox="allow-scripts allow-same-origin allow-presentation"
        allowFullScreen
      ></iframe>
      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        className="absolute top-[80%] md:top-[60%] right-5 md:right-10 p-2 rounded-full bg-gray-700 bg-opacity-70 text-white focus:outline-none cursor-pointer z-10"
      >
        {isMuted ? (
          <img className="w-3 h-3 md:w-5 md:h-5" src={UNMUTE_ICON} alt="no-audio" />
        ) : (
          <img className="w-3 h-3 md:w-5 md:h-5" src={MUTE_ICON} alt="mute" />
        )}
      </button>
    </div>
  );
};

export default BannerMedia;
