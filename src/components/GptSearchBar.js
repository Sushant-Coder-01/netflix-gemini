import { useDispatch, useSelector } from "react-redux";
import { lang } from "../utils/languageConstants";
import { useRef } from "react";
import {
  addRecommandedMovies,
  clearRecommandedMovies,
  clearSearchMoviesInTMDB,
  setGptPrompt,
} from "../redux/gptSlice";
import { toggleSearchBtn } from "../redux/configSlice";
import useGeminiAPI from "../hooks/useGeminiAPI";

const GptSearchBar = () => {
  const gptPrompt = useRef(null);
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const storedGptPrompt = useSelector((store) => store.gpt.gptPrompt);
  const { generateText, response, error } = useGeminiAPI();

  const handleInputChange = (event) => {
    dispatch(setGptPrompt(event.target.value));
  };

  const handleGptSearchClick = async () => {
    const promptValue = storedGptPrompt.trim();
    if (!promptValue) {
      alert("Please enter a movie-related interest.");
      return;
    }

    dispatch(clearRecommandedMovies());
    dispatch(clearSearchMoviesInTMDB());
    dispatch(toggleSearchBtn(true));

    const gptQuery = `
    You are a "Movie Recommendation System". Based on the user's interest in "${promptValue}", provide a list of movies that are closely related to this interest.

    If "${promptValue}" matches a specific movie title, list that movie first. After that, include movies that fit the same genre or theme. Finally, provide other popular movies that loosely align with the user's interest.

    Respond **only** with a clean JSON array, containing only the movie names as strings in the following format:
    ["Movie1", "Movie2", "Movie3", "Movie4", "Movie5"]
    Do not include any extra text, backticks, or markdown formatting around array.
`;

    try {
      const apiResponse = await generateText(gptQuery);

      // Ensure response is a JSON array of movie names
      const movieArray = JSON.parse(apiResponse);

      if (Array.isArray(movieArray)) {
        dispatch(addRecommandedMovies(movieArray));
      } else {
        console.error("Unexpected response format:", movieArray);
        alert("Failed to fetch a valid movie list. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching movie recommendations:", error);
      alert("Failed to fetch movie recommendations. Please try again.");
    } finally {
      dispatch(toggleSearchBtn(false));
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") handleGptSearchClick();
  };

  return (
    <div className="absolute top-28 left-1/2 transform -translate-x-1/2 w-11/12 sm:w-4/6 md:w-5/6 lg:w-4/6 xl:w-3/5 2xl:w-2/5 z-10">
      <div className="flex items-center bg-gray-800/80 bg-gradient-to-t from-white/10 px-1 rounded-lg border-2 border-red-600 shadow-lg">
        <input
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          ref={gptPrompt}
          className="bg-transparent text-white w-full h-12 md:text-xl px-4 placeholder-white/50 focus:outline-none"
          placeholder={
            lang[langKey]?.gptSearchPlaceholder || "Search for movies..."
          }
          value={storedGptPrompt}
        />
        <p
          className="text-3xl text-gray-300 cursor-pointer px-4 hover:text-white"
          onClick={handleGptSearchClick}
        >
          ⌕
        </p>
      </div>
    </div>
  );
};

export default GptSearchBar;
