import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { MODEL_NAME } from "../utils/constants";
import { addGptGetSimilarMovieNames } from "../redux/gptSlice";
import client from "../utils/openai";
import useGeminiAPI from "./useGeminiAPI";

const useSimilarMoviesByGenre = (movieDetails) => {
  const dispatch = useDispatch();
  const { generateText, response, error } = useGeminiAPI();

  const fetchSimilarMovies = async () => {
    const genres = movieDetails?.genres?.map((genre) => genre?.name);
    const genresString = genres?.join(", ");

    const gptQuery = `For each genre in the list ${genresString}, list exactly 5 popular movies in the following JSON format:
  
      [
      { "genre": "genere name", "movies": ["movieName1", "movieName2", "movieName3", "movieName4", "movieName5"] },
      ]
  
      Respond with JSON only, without any additional explanation or text.
    `;

    // try {
    //   const completion = await client.chat.completions.create({
    //     model: MODEL_NAME,
    //     messages: [
    //       {
    //         role: "user",
    //         content: query,
    //       },
    //     ],
    //   });

    //   const response = completion.choices[0]?.message?.content?.trim() || [];

    //   try {
    //     const movieDataByGenre = JSON.parse(response);
    //     if (movieDataByGenre) {
    //       dispatch(addGptGetSimilarMovieNames(movieDataByGenre));
    //     } else {
    //       console.warn("No valid movie data to dispatch");
    //     }
    //   } catch (parseError) {
    //     console.error("Parsing error:", parseError);
    //   }
    // } catch (error) {
    //   console.error("Error fetching similar movies by genre:", error);
    // }

    try {
      const apiResponse = await generateText(gptQuery);

      console.log(apiResponse);

      const moviesByGenres = JSON.parse(apiResponse);

      if (moviesByGenres) {
        dispatch(addGptGetSimilarMovieNames(moviesByGenres));
      } else {
        console.warn("No valid movie data to dispatch");
      }
    } catch (error) {
      console.error("Error fetching similar movies by genre:", error);
    }
  };

  useEffect(() => {
    if (movieDetails) {
      fetchSimilarMovies();
    }
  }, [movieDetails]);
};

export default useSimilarMoviesByGenre;
