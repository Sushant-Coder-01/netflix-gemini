import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import HeroBanner from "./HeroBanner";
import ContentCarousel from "./ContentCarousel";

const Browse = () => {
  useNowPlayingMovies();

  return (
    <div>
      <Header />
      <HeroBanner />
      <ContentCarousel />
    </div>
  );
};

export default Browse;
