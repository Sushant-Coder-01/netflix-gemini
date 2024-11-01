import GptSearchBar from "./GptSearchBar";
import { LOGIN_BACKGROUND_IMAGE } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { useSelector } from "react-redux";
import GptSearchWelcome from "./GptSearchWelcome";

const GptSearchPage = () => {
  const searchBtnState = useSelector((store) => store.config.searchBtnState);

  const { searchMoviesInTMDB, gptRecommandedMovies } = useSelector(
    (store) => store.gpt
  );

  return (
    <div className="relative w-full h-full">
      {/* Background Image */}
      <div className="absolute w-full h-full overflow-hidden">
        <div className="fixed w-full h-full bg-black/80 z-10"></div>
        <img
          className="fixed inset-0 w-full h-full object-cover"
          alt="background-img"
          src={LOGIN_BACKGROUND_IMAGE}
        />
      </div>

      {/* Main Content */}
      <div className="relative">
        <GptSearchBar />
        {!searchBtnState && !searchMoviesInTMDB && <GptSearchWelcome />}

        <GptMovieSuggestions
          gptRecommandedMovies={gptRecommandedMovies}
          searchMoviesInTMDB={searchMoviesInTMDB}
        />
      </div>
    </div>
  );
};

export default GptSearchPage;
