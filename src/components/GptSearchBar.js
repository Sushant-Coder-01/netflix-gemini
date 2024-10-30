import { useSelector } from "react-redux";
import { LOGIN_BACKGROUND_IMAGE } from "../utils/constants";
import { lang } from "../utils/languageConstants";

const GptSearchBar = () => {

  const langKey = useSelector((store) => store.config.lang);

  return (
    <div>
      <div className="absolute w-full h-full overflow-hidden">
        <div className="absolute w-full h-full bg-black/60 z-10"></div>
        <img
          className="absolute inset-0 w-full h-full object-cover blur-sm"
          alt="background-img"
          src={LOGIN_BACKGROUND_IMAGE}
        />
      </div>
      <div className="absolute top-28 left-1/2 transform -translate-x-1/2 z-20 w-5/12">
        <div className="flex items-center bg-gray-800/80 bg-gradient-to-t from-white/10 px-1 rounded-lg border-2 border-red-600 shadow-lg">
          <input
            className="bg-transparent text-white w-full h-12 text-xl px-4 placeholder-white/50 focus:outline-none"
            placeholder={lang[langKey].gptSearchPlaceholder}
          />
          <p className="text-3xl text-gray-300 cursor-pointer px-4 hover:text-white">
            ⌕
          </p>
        </div>
      </div>
    </div>
  );
};

export default GptSearchBar;
