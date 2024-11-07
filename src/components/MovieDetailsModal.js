import { useSelector } from "react-redux";
import { IMG_CDN, PLAY_ICON } from "../utils/constants";
import { lang } from "../utils/languageConstants";
import { useNavigate } from "react-router-dom";

const MovieDetailsModal = ({
  id,
  title,
  posterPath,
  overview,
  avgVote,
  releaseDate,
  onClose,
}) => {
  const langKey = useSelector((store) => store.config.lang);
  const navigate = useNavigate();

  const handlePlayButtonClick = () => {
    if (id) {
      navigate(`/browse/trailer/${id}`);
      onClose();
    } else {
      console.error("Movie ID is not defined");
    }
  };

  return (  
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm transition-all duration-300">
      <div className="relative bg-gray-800 text-white h-auto sm:h-auto p-6 sm:p-8 md:p-10 w-10/12 sm:w-10/12 md:w-3/4 lg:w-3/5 xl:w-1/2 max-w-4xl rounded-2xl shadow-2xl transform transition-all duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-300 hover:text-white transition-transform transform hover:scale-125"
        >
          &times;
        </button>

        {/* Movie Poster and Info */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
          {/* Movie Poster */}
          <img
            src={IMG_CDN + posterPath}
            alt="movie-poster"
            className="w-2/5 sm:w-3/4 md:w-2/5 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          />

          {/* Movie Info */}
          <div className="flex flex-col justify-between md:w-3/5 space-y-4 md:space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide">
              {title}
            </h2>
            <p className="text-sm line-clamp-6 sm:text-base md:text-md text-gray-300 leading-relaxed">
              {overview}
            </p>
            <div className="flex flex-col items-start space-y-2 sm:space-y-4">
              <div className="flex items-center">
                <span className="text-md sm:text-lg font-semibold">
                  Avg Rating:
                </span>
                <span className="ml-2 text-yellow-400 font-bold text-base sm:text-lg">
                  {avgVote.toFixed(1)}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-md sm:text-lg font-semibold">
                  Release Date:
                </span>
                <span className="ml-2 text-yellow-400 font-bold text-base sm:text-lg">
                  {releaseDate}
                </span>
              </div>
            </div>

            {/* Play Button */}
            <div
              onClick={handlePlayButtonClick}
              className="flex w-28 sm:w-32 items-center space-x-2 sm:space-x-3 px-4 py-2 sm:px-6 sm:py-3 bg-red-600 text-black font-semibold rounded-sm cursor-pointer hover:bg-red-500 hover:scale-105 transition transform duration-300 ease-in-out shadow-lg"
            >
              <img className="w-5 sm:w-6" src={PLAY_ICON} alt="play" />
              <p className="text-lg sm:text-xl font-semibold">
                {lang[langKey].playBtn}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsModal;
