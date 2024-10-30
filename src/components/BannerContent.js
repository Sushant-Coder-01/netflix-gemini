import React, { useState } from "react";
import useMovieImage from "../hooks/useMovieImage";
import { useSelector } from "react-redux";
import { lang } from "../utils/languageConstants";
import MovieOverview from "./MovieOverview";

const BannerContent = ({ title, overview, movieId }) => {
  const [showOverview, setShowOverview] = useState(false);

  const filePath = useMovieImage(movieId);

  const langKey = useSelector((store) => store.config.lang);

  const handleMoreInfoClick = () => {
    setShowOverview(!showOverview);
  };

  return (
    <div className="absolute inset-0 bg-gradient-to-r from-black/70 w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black w-full overflow-hidden">
        <div className="pt-80 pl-12 w-screen">
          <div className="w-64 my-10 ">
            {filePath ? (
              <img
                src={`https://image.tmdb.org/t/p/original/${filePath}`}
                alt="movie-img"
              />
            ) : (
              <h1 className="text-white text-4xl w-96">{title}</h1>
            )}
          </div>
          <div className="flex gap-4">
            <div className="flex items-center px-8 py-2 bg-white text-black font-semibold rounded-sm hover:opacity-70 cursor-pointer">
              <p className="rounded-sm text-2xl ">⏵ {lang[langKey].playBtn}</p>
              <p className="rounded-sm text-2xl"></p>
            </div>

            <div
              className="flex items-center px-8 py-2 bg-gray-500/50 text-white gap-2 font-semibold rounded-sm hover:bg-gray-500/30 cursor-pointer"
              onClick={handleMoreInfoClick}
            >
              <p className="rounded-sm text-2xl">ⓘ</p>
              <p className="rounded-sm text-2xl">{lang[langKey].moreInfoBtn}</p>
            </div>
          </div>
          {showOverview ? null : <MovieOverview overview={overview}/>}
        </div>
      </div>
    </div>
  );
};

export default BannerContent;
