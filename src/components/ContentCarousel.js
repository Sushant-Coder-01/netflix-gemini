import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import { lang } from "../utils/languageConstants";

const ContentCarousel = () => {
  const movies = useSelector((store) => store.movies);
  const langKey = useSelector((store) => store.config.lang);
  return (
    <div className="bg-black h-auto pb-10">
      <div className="relative -mt-10 pt-8 md:pt-0 md:-mt-64">
        <MovieList
          title={lang[langKey].trending}
          movies={movies?.trendingMovies}
        />
        <MovieList
          title={lang[langKey].nowPlaying}
          movies={movies?.nowPlayingMovies}
        />
        <MovieList
          title={lang[langKey].popular}
          movies={movies?.popularMovies}
        />
        <MovieList
          title={lang[langKey].topRated}
          movies={movies?.topRatedMovies}
        />
        <MovieList
          title={lang[langKey].upcoming}
          movies={movies?.upcomingMovies}
        />
      </div>
    </div>
  );
};

export default ContentCarousel;
