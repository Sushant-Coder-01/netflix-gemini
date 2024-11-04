import BannerMedia from "./BannerMedia";
import BannerContent from "./BannerContent";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const HeroBanner = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  const [bannerMovie, setBannerMovie] = useState(null);

  useEffect(() => {
    if (movies && movies.length > 0) {
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      setBannerMovie(randomMovie);
    }
  }, [movies]);

  if (!bannerMovie) return null;

  const { original_title, overview, id } = bannerMovie;

  return (
    <div className="md:h-screen pt-16 md:pt-0">
      <BannerMedia movieId={id} />
      <BannerContent title={original_title} overview={overview} movieId={id} />
    </div>
  );
};

export default HeroBanner;
