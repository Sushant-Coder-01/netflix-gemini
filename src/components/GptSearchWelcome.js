import { useDispatch, useSelector } from "react-redux";
import { lang } from "../utils/languageConstants";
import { setGptPrompt } from "../redux/gptSlice";

const GptSearchWelcome = () => {
  const langKey = useSelector((store) => store.config.lang);
  const dispatch = useDispatch();

  const handleSuggestionClick = (suggestion) => {
    dispatch(setGptPrompt(suggestion));
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center h-screen top-8 md:top-0 bg-black/20 text-white px-4 sm:px-6 md:px-8">
    <div className="relative z-10 text-center space-y-6">
      <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
        {lang[langKey].welcome}
      </h1>
      <p className="text-lg md:text-xl text-gray-300">
        {lang[langKey].discover_recommendations}
      </p>
      <div className="mt-8">
        <p className="text-sm text-gray-400">{lang[langKey].try_searching}</p>
        <div className="flex flex-wrap justify-center gap-2 mt-3">
          {[
            lang[langKey].comedy_example,
            lang[langKey].bollywood_romantic_example,
            lang[langKey].thriller_example,
            lang[langKey].scifi_example,
            lang[langKey].nolan_movies_example,
          ].map((example) => (
            <span
              key={example}
              className="bg-red-600 px-3 py-1 rounded-full text-white text-sm cursor-pointer hover:bg-red-500"
              onClick={() => handleSuggestionClick(example)}
            >
              {example}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-8 space-y-3 text-center text-gray-400">
        <p className="text-sm md:text-base">{lang[langKey].prompt}</p>
        <p className="text-sm md:text-base">{lang[langKey].genres_example}</p>
      </div>
    </div>
  </div>
  );
};

export default GptSearchWelcome;
