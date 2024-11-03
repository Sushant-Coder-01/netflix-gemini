import { useDispatch, useSelector } from "react-redux";
import { lang } from "../utils/languageConstants";
import { useRef } from "react";
import client from "../utils/openai";
import {
  addRecommandedMovies,
  clearRecommandedMovies,
  clearSearchMoviesInTMDB,
  setGptPrompt,
} from "../redux/gptSlice";
import { toggleSearchBtn } from "../redux/configSlice";
import { MODEL_NAME } from "../utils/constants";

const GptSearchBar = () => {
  const gptPrompt = useRef(null);
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const storedGptPrompt = useSelector((store) => store.gpt.gptPrompt);

  const handleInputChange = (event) => {
    dispatch(setGptPrompt(event.target.value));
  };

  const handleGptSearchClick = async () => {
    const promptValue = storedGptPrompt.trim();
    if (!promptValue) {
      alert("Please enter a valid movie interest.");
      return;
    }

    dispatch(clearRecommandedMovies());
    dispatch(clearSearchMoviesInTMDB());
    dispatch(toggleSearchBtn(true));

    const gptQuery = `
    You are a "Movie Recommendation System". Based on the user's interest in comedy Indian movies, please provide a list of exactly 5 movies, adhering to these categories:
    
    1. Top-rated or highly acclaimed
    2. Recent or trending
    3. Popular
    4. Classic or older but best-quality
  
    Respond with only the names of the movies, separated by commas, and without any additional text, numbers, or formatting artifacts. Please provide the movie names in the following format: "Movie1, Movie2, Movie3, Movie4, Movie5".`;

    try {
      const completion = await client.chat.completions.create({
        model: MODEL_NAME,
        messages: [
          {
            role: "user",
            content: gptQuery,
          },
        ],
      });

      const gptRecommendedMovies =
        completion.choices[0]?.message?.content?.trim() || "";

      const cleanedMovies = gptRecommendedMovies
        .split(",")
        .map((movie) => movie.trim())
        .filter((movie) => movie.length > 0);

      dispatch(addRecommandedMovies(cleanedMovies));
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
    <div className="absolute top-28 left-1/2 transform -translate-x-1/2 w-3/4 sm:w-4/6 md:w-5/6 lg:w-4/6 xl:w-7/12 2xl:w-5/12 z-10">
      <div className="flex items-center bg-gray-800/80 bg-gradient-to-t from-white/10 px-1 rounded-lg border-2 border-red-600 shadow-lg">
        <input
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          ref={gptPrompt}
          className="bg-transparent text-white w-full h-12 text-xl px-4 placeholder-white/50 focus:outline-none"
          placeholder={lang[langKey].gptSearchPlaceholder}
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
