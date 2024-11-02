import { IMG_CDN } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;

  return (
    <div className="w-28 md:w-56">
      <img
        className="w-full h-full rounded-sm"
        alt="movie-card"
        src={IMG_CDN + posterPath}
      />
    </div>
  );
};

export default MovieCard;
