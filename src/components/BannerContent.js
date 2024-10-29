import React from "react";
import useMovieImage from "../hooks/useMovieImage";

const BannerContent = ({ title, overview, movieId }) => {
  const filePath = useMovieImage(movieId);

  console.log(title);

  return (
    <div className="absolute inset-0 bg-gradient-to-r from-black w-full overflow-hidden">
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
              <p className="rounded-sm text-2xl ">⏵ Play</p>
              <p className="rounded-sm text-2xl"></p>
            </div>

            <div className="flex items-center px-8 py-2 bg-gray-500/50 text-white gap-2 font-semibold rounded-sm hover:bg-gray-500/30 cursor-pointer">
              <p className="rounded-sm text-2xl">ⓘ</p>
              <p className="rounded-sm text-2xl">More Info</p>
            </div>
          </div>
          {/* <h1>{title}</h1>
      <p>{overview}</p> */}
        </div>
      </div>
    </div>
  );
};

export default BannerContent;
