import useMovieVideo from "../hooks/useMovieVideo";
import { useParams } from "react-router-dom";
import Header from "./Header";
import { LOGIN_BACKGROUND_IMAGE } from "../utils/constants";
import { useSelector } from "react-redux";
import { useState } from "react";
import useMovieDetails from "../hooks/useMovieDetails";
import useGptRecommendationReasons from "../hooks/useGptRecommendationReasons";
import { CarouselShimmer } from "./Shimmer";
import Carousel from "./Carousel";

const MovieTrailerPage = () => {
  const { id } = useParams();
  useMovieDetails(id);
  const trailerVideo = useMovieVideo(id);
  // Fetch related trailers from Redux store
  const relatedTrailers = useSelector((store) => store.movies.relatedTrailers);

  // State for the selected trailer
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const movieDetails = useSelector((store) => store.movies.movieDetails);

  // useGptRecommendationReasons(movieDetails?.title);
  const gptReasonsToWatch = useGptRecommendationReasons(movieDetails?.title);

  if (!movieDetails) return null; // Make sure to return null or a loading state while fetching

  return (
    <div className="relative overflow-hidden bg-black text-white min-h-screen">
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
      <div className="relative z-10 flex flex-col lg:flex-row lg:space-x-6 lg:p-10 top-12">
        {/* Title Section */}
        <div className="absolute top-2 md:left-12 text-3xl py-4 px-2 md:p-4 font-bold text-white z-10">
          <h1>{movieDetails?.title || "Movie Title"}</h1>
          <h2 className="text-lg italic text-gray-400 font-semibold ml-2">
            - {movieDetails.tagline || "Best Movie Ever"}
          </h2>
        </div>

        {/* Left Content - Main Trailer and Details */}
        <div className="flex-1 mt-24 md:mt-16 space-y-4 lg:w-3/4 lg:top-16 lg:self-start">
          {/* Main Trailer Video */}
          <div className="relative">
            <iframe
              className="w-full aspect-video max-w-5xl rounded-lg shadow-lg border-2 border-red-500/30 transition-transform duration-500 transform"
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
                <div className="flex flex-col justify-between h-auto">
                  { gptReasonsToWatch ? (
                    <Carousel items={gptReasonsToWatch} />
                  ) : (
                    <CarouselShimmer />
                  )}
                </div>
              </div>
              <div className="hidden md:block pt-10 h-auto">
                <h1>Similar Movies</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Related Trailers */}
        <div className="w-full lg:w-1/4 mt-6 lg:mt-0 lg:h-screen">
          <h2 className="text-xl px-3 md:px-2 font-semibold mb-4 text-white">
            More Trailers, Teasers, and Clips
          </h2>
          <div className="space-y-4">
            {relatedTrailers?.map((trailer) => (
              <div
                key={trailer.id}
                onClick={() => setSelectedTrailer(trailer)}
                className={`cursor-pointer p-3 rounded-lg transition duration-300 transform ${
                  selectedTrailer?.id === trailer.id
                    ? "bg-red-600 scale-100"
                    : "hover:shadow-lg hover:bg-gray-800"
                } relative`}
              >
                <img
                  src={`https://img.youtube.com/vi/${trailer.key}/0.jpg`} // YouTube thumbnail URL
                  alt={trailer.title}
                  className="w-full rounded-md mb-2"
                />
                <p className="absolute bottom-2 left-2 text-white bg-black bg-opacity-50 p-1 rounded-md text-sm font-semibold">
                  {trailer.title}
                </p>
                <div className="mt-1 text-gray-300">
                  <p className="text-xs">{trailer.releaseDate}</p>
                  <p className="text-xs">
                    {trailer.type || "No description available"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieTrailerPage;
