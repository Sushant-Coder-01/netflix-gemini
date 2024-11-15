import React, { useState } from "react";
import useMovieImage from "../hooks/useMovieImage";
import { useDispatch, useSelector } from "react-redux";
import { lang } from "../utils/languageConstants";
import MovieOverview from "./MovieOverview";
import { PLAY_ICON } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { clearBannerMovie } from "../redux/moviesSlice";

const BannerContent = ({ title, overview, movieId }) => {
  const [showOverview, setShowOverview] = useState(false);
  const filePath = useMovieImage(movieId);
  const langKey = useSelector((store) => store.config.lang);
  const bannerMovie = useSelector((store) => store.movies.bannerMovie);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMoreInfoClick = () => {
    setShowOverview((prev) => !prev);
  };

  const handlePlayButtonClick = () => {
    if (bannerMovie) {
      navigate(`/browse/trailer/${bannerMovie}`);
      dispatch(clearBannerMovie());
    } else {
      console.error("Movie ID is not defined");
    }
  };

  return (
    <div className="absolute inset-0 md:bg-gradient-to-r md:from-black/70  md:aspect-video overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black md:bg-gradient-to-t md:from-black w-full overflow-hidden">
        <div
          className={
            " pl-8 md:pl-12 w-screen flex flex-col transition-all duration-300"
          }
        >
          <div className="transition-transform duration-900 ease-in-out transform -translate-y-5">
            {showOverview ? (
              <>
                <div className="w-40 md:w-64 md:mt-80">
                  {filePath ? (
                    <img
                      src={`https://image.tmdb.org/t/p/original/${filePath}`}
                      alt="movie-img"
                    />
                  ) : (
                    <h1 className="text-white text-4xl w-96">{title}</h1>
                  )}
                </div>
                <div
                  className={`transition-all duration-500 ease-in-out mt-2 ${
                    showOverview
                      ? "opacity-100 translate-y-0"
                      : "opacity-80 -translate-y-2"
                  }`}
                >
                  <MovieOverview overview={overview} />
                </div>
              </>
            ) : (
              <div className="w-32 md:w-64 mt-40 md:mt-96">
                {filePath ? (
                  <img
                    src={`https://image.tmdb.org/t/p/original/${filePath}`}
                    alt="movie-img"
                  />
                ) : (
                  <h1 className="text-white text-4xl w-96">{title}</h1>
                )}
              </div>
            )}
          </div>
        </div>
        {/* Buttons Section */}
        <div className="flex gap-4 pl-16 md:pl-12">
          <div
            className="flex space-x-1 items-center px-2 py-1 md:px-8 md:py-2 bg-white text-black font-semibold rounded-sm hover:opacity-70 cursor-pointer"
            onClick={handlePlayButtonClick}
          >
            <img className="w-5 md:w-8" src={PLAY_ICON} alt="play" />
            <p className="rounded-sm text-md md:text-2xl">
              {lang[langKey].playBtn}
            </p>
          </div>

          <div
            className="hidden md:flex items-center px-8 py-2 bg-gray-500/50 text-white gap-2 font-semibold rounded-sm hover:bg-gray-500/30 cursor-pointer"
            onClick={handleMoreInfoClick}
          >
            <p className="rounded-sm text-2xl">ⓘ</p>
            <p className="rounded-sm text-2xl">{lang[langKey].moreInfoBtn}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerContent;
