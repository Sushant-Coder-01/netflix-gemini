import { useState } from "react";
import { IMG_CDN } from "../utils/constants";
import MovieDetailsModal from "./MovieDetailsModal"; // Import modal component

const MovieCard = ({
  id,
  posterPath,
  title,
  overview,
  avgVote,
  releaseDate,
}) => {
  const [showModal, setShowModal] = useState(false);

  if (!posterPath) return null;

  const handleCardClick = () => {
    setShowModal(true); // Open modal when card is clicked
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className="cursor-pointer w-32 sm:w-28 md:w-40 lg:w-56 aspect-[2/3] overflow-hidden rounded-sm"
      >
        <img
          className="w-full h-full object-cover rounded-sm transition-all hover:scale-105"
          alt="movie-card"
          src={IMG_CDN + posterPath}
        />
      </div>

      {showModal && (
        <MovieDetailsModal
          id={id}
          title={title}
          posterPath={posterPath}
          overview={overview}
          avgVote={avgVote}
          releaseDate={releaseDate}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default MovieCard;
