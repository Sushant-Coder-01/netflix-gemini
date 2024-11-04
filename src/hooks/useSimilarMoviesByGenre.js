import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { MODEL_NAME } from "../utils/constants";
import { addGptGetSimilarMovieNames } from "../redux/gptSlice";
import client from "../utils/openai";

const useSimilarMoviesByGenre = (genres) => {
  const dispatch = useDispatch();

  const fetchSimilarMovies = async () => {
    const genresString = genres.join(", ");

    const query = `
      For each genre in the following list: ${genresString}, provide an array of popular, top-rated, trending, or recent movie names.
      The response should be a JSON object with each genre as a key, and each key's value should be an array of strings with exactly 5 movie names for that genre.
      Do not include any additional text. Format the response exactly like this example:

      {
        "Animation": ["movieName1", "movieName2", "movieName3", "movieName4", "movieName5"],
        "Science Fiction": ["movieName1", "movieName2", "movieName3", "movieName4", "movieName5"],
        "Family": ["movieName1", "movieName2", "movieName3", "movieName4", "movieName5"]
      }
    `;

    try {
      const completion = await client.chat.completions.create({
        model: MODEL_NAME,
        messages: [
          {
            role: "user",
            content: query,
          },
        ],
      });

      const responseContent =
        completion.choices[0]?.message?.content?.trim() || "{}";

      console.log(responseContent);

      // Attempt to parse the JSON response
      let movieDataByGenre;
      try {
        movieDataByGenre = JSON.parse(responseContent);
        if (Object?.keys(movieDataByGenre).length > 0) {
          dispatch(addGptGetSimilarMovieNames(movieDataByGenre));
        } else {
          console.warn("No valid movie data to dispatch");
        }
      } catch (parseError) {
        console.error("Parsing error:", parseError);
      }
    } catch (error) {
      console.error("Error fetching similar movies by genre:", error);
    }
  };

  useEffect(() => {
    if (genres) {
      fetchSimilarMovies();
    }
  }, []);
};

export default useSimilarMoviesByGenre;
