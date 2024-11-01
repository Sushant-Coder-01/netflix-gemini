import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import HeroBanner from "./HeroBanner";
import ContentCarousel from "./ContentCarousel";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import useTrendingMovies from "../hooks/useTrendingMovies";
import { useSelector } from "react-redux";
import GptSearchPage from "./GptSearchPage";

const Browse = () => {
  const gptSearchToggleBtn = useSelector(
    (store) => store.gpt.gptSearchToggleBtn
  );

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  useTrendingMovies();

  return (
    <div>
      <Header />
      {gptSearchToggleBtn ? (
        <GptSearchPage />
      ) : (
        <>
          <HeroBanner />
          <ContentCarousel />
        </>
      )}
    </div>
  );
};

export default Browse;
