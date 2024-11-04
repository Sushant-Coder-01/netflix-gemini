import useMovieVideo from "../hooks/useMovieVideo";
import { useParams } from "react-router-dom";
import Header from "./Header";
import { LOGIN_BACKGROUND_IMAGE } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useMovieDetails from "../hooks/useMovieDetails";
import useGptRecommendationReasons from "../hooks/useGptRecommendationReasons";
import { CarouselShimmer } from "./Shimmer";
import Carousel from "./Carousel";
import downArrow from "../assets/icons/down-arrow-icon.png";
import useSimilarMoviesByGenre from "../hooks/useSimilarMoviesByGenre";
import { addMovieGenres } from "../redux/moviesSlice";
import SimilarMovies from "./SimilarMovies";

const MovieTrailerPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const movieGenres = useSelector((store) => store.movies.genres);
  const trailerVideo = useMovieVideo(id);
  const relatedTrailers = useSelector((store) => store.movies.relatedTrailers);
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const movieDetails = useSelector((store) => store.movies.movieDetails);
  const gptReasonsToWatch = useGptRecommendationReasons(movieDetails?.title);
  const [showPlaylistCarousel, setShowPlaylistCarousel] = useState(false);
  const genres = movieDetails?.genres?.map((genre) => genre.name);
  const gptGetSimilarMovieNames = useSelector(
    (store) => store.gpt.gptGetSimilarMovieNames
  );

  useMovieDetails(id);
  useSimilarMoviesByGenre(movieGenres);

  useEffect(() => {
    if (genres) {
      dispatch(addMovieGenres(genres));
    }
  }, []);

  if (!movieDetails) return null;

  const handlePlaylistCarousel = () => {
    setShowPlaylistCarousel(!showPlaylistCarousel);
  };

  console.log(gptGetSimilarMovieNames, "hii");

  return (
    <div className="relative overflow-hidden bg-black text-white">
      <Header />

      {/* Background Image */}
      <div className="fixed inset-0">
        <img
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          alt="background-img"
          src={LOGIN_BACKGROUND_IMAGE}
        />
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>

      {/* Main Layout */}
      <div className="relative z-10 flex flex-col lg:flex-row mt-20 md:mx-2 md:ml-8 md:mt-5 ">
        {/* Left Content - Main Trailer and Details */}
        <div className="flex-1 mx-3 md:mx-0 md:sticky space-y-4 lg:w-3/4 lg:top-32 lg:self-start md:overflow-y-auto md:max-h-screen md:mt-12">
          <div className=" text-3xl font-bold text-white z-10">
            <h1 className="text-3xl font-bold text-white truncate">
              {movieDetails?.title || "Movie Title"}
            </h1>
            <h2 className="text-lg italic text-gray-400 font-semibold ml-2">
              - {movieDetails.tagline || "Best Movie Ever"}
            </h2>
          </div>
          {/* Main Trailer Video */}
          <div className="relative md:mx-0">
            <iframe
              className="w-full aspect-video  max-w-6xl rounded-lg shadow-lg border-2 border-red-500/30 transition-transform duration-500 transform"
              src={`https://www.youtube.com/embed/${
                selectedTrailer?.key || trailerVideo?.key
              }?controls=1&autoplay=1&mute=0&loop=1&playlist=${
                selectedTrailer?.key || trailerVideo?.key
              }`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              sandbox="allow-scripts allow-same-origin allow-presentation"
              allowFullScreen
            ></iframe>
          </div>
          {/* Movie Details */}
          <div className="space-y-3 px-3 md:px-0">
            <h2 className="text-2xl font-bold text-white">
              {trailerVideo?.name || "Movie Title"}
            </h2>
            <div className="space-y-1">
              <div className="flex space-x-2">
                <p className="font-semibold">
                  {movieDetails.status === "Released"
                    ? "Released Date"
                    : "Release Date"}
                  :
                </p>
                <p className="text-gray-100 italic">
                  {movieDetails.release_date}
                </p>
              </div>
              <div className="flex space-x-2">
                <p className="font-semibold">Genres: </p>
                <p className="text-gray-100 italic">
                  {movieDetails.genres.map((genre) => genre.name).join(", ")}
                </p>
              </div>
              <div className="flex space-x-2">
                <p className="font-semibold">Rating: </p>
                <p className="text-gray-100 italic">
                  {movieDetails.vote_average.toFixed(1)}
                </p>
              </div>
              <div className="flex space-x-2 md:w-10/12">
                <p className="font-semibold">Overview:- </p>
                <p className="text-gray-100 italic">{movieDetails.overview}</p>
              </div>
              <div className="space-y-5 pt-10">
                <h1 className="text-2xl font-bold text-white">
                  Why You Should Watch It?
                </h1>
                <div className=" justify-center h-auto">
                  {gptReasonsToWatch ? (
                    <Carousel items={gptReasonsToWatch} />
                  ) : (
                    <CarouselShimmer />
                  )}
                </div>
              </div>
              <div className="hidden md:block h-auto">
                <h1 className="text-2xl font-bold">Similar Movies</h1>
                {gptGetSimilarMovieNames && <SimilarMovies />}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Related Trailers */}
        <div className="w-full lg:w-1/4 mt-16 lg:h-auto md:overflow-y-auto md:max-h-screen">
          <h2
            className="md:hidden text-xl px-2 md:px-3 font-semibold mb-4 text-white cursor-pointer border-2 border-red-800 py-2 mx-4 rounded-sm flex justify-between items-center"
            onClick={handlePlaylistCarousel}
          >
            More Trailers, Teasers, and Clips
            {showPlaylistCarousel ? (
              <img
                className="w-6 h-5 rounded-sm rotate-180"
                alt="down-arrow"
                src={downArrow}
              />
            ) : (
              <img
                className="w-6 h-5 rounded-sm"
                alt="down-arrow"
                src={downArrow}
              />
            )}
          </h2>
          <h2
            className="hidden md:block text-xl px-3 md:px-3 font-semibold mb-4 text-white"
            onClick={handlePlaylistCarousel}
          >
            More Trailers, Teasers, and Clips
          </h2>
          <div className="space-y-4 rounded-md">
            {/* Show trailer carousel only on mobile */}
            <div className="block md:hidden">
              {showPlaylistCarousel &&
                relatedTrailers?.map((trailer) => (
                  <div
                    key={trailer.id}
                    onClick={() => setSelectedTrailer(trailer)}
                    className={`cursor-pointer p-3 rounded-lg transition duration-300 transform bg-gray-800 relative hover:z-20 m-3 ${
                      selectedTrailer?.id === trailer.id
                        ? "bg-red-600 scale-100"
                        : "hover:shadow-lg hover:scale-105"
                    }`}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${trailer.key}/0.jpg`} // YouTube thumbnail URL
                      alt={trailer.title}
                      className="w-full aspect-auto border-2 rounded-md mb-2"
                    />
                    <p className="absolute bottom-2 left-2 text-white bg-black bg-opacity-50 p-1 rounded-md text-sm font-semibold">
                      {trailer.title}
                    </p>
                    <div className="mt-1 text-gray-300">
                      <p className="text-xs">{trailer.releaseDate}</p>
                      <p className="text-lg">
                        {trailer.type || "No description available"}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
            <div className="hidden md:block">
              {relatedTrailers?.map((trailer) => (
                <div
                  key={trailer.id}
                  onClick={() => setSelectedTrailer(trailer)}
                  className={`cursor-pointer p-3 rounded-lg transition duration-300 transform bg-gray-800 relative hover:z-20 m-3 ${
                    selectedTrailer?.id === trailer.id
                      ? "bg-red-600 scale-100"
                      : "hover:shadow-lg hover:scale-105"
                  }`}
                >
                  <img
                    src={`https://img.youtube.com/vi/${trailer.key}/0.jpg`} // YouTube thumbnail URL
                    alt={trailer.title}
                    className="w-full aspect-auto border-2 rounded-md mb-2"
                  />
                  <p className="absolute bottom-2 left-2 text-white bg-black bg-opacity-50 p-1 rounded-md text-sm font-semibold">
                    {trailer.title}
                  </p>
                  <div className="mt-1 text-gray-300">
                    <p className="text-xs">{trailer.releaseDate}</p>
                    <p className="text-lg">
                      {trailer.type || "No description available"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:hidden h-auto mt-12">
            <h1 className="text-2xl font-bold m-5">Similar Movies</h1>
            {gptGetSimilarMovieNames ? <SimilarMovies /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieTrailerPage;
