import { useSelector } from "react-redux";
import BannerMedia from "./BannerMedia";
import BannerContent from "./BannerContent";

const HeroBanner = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if(!movies) return;

  const BannerMovie = movies[16];

  const {original_title, overview, id} = BannerMovie;
  
  return (
    <div className="h-screen">
      <BannerMedia movieId={id} />
      <BannerContent title={original_title} overview={overview} movieId={id} />
    </div>
  );
};

export default HeroBanner;
