import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addReasonsToWatch, clearReasonsToWatch } from "../redux/gptSlice";
import client from "../utils/openai";
import { MODEL_NAME } from "../utils/constants";
import useGeminiAPI from "./useGeminiAPI";

const useGptRecommendationReasons = (movieDetails) => {
  const dispatch = useDispatch();
  const { generateText, response, error } = useGeminiAPI();

  const fetchGptRecommendationReasons = async () => {
    const gptQuery = `
    Provide exactly and only a JSON array of strings, each containing a single, brief reason why someone should watch the movie "${movieDetails?.title}". Each reason should be concise and no longer than one line.

    If you cannot provide at least five distinct reasons, respond with an empty array: [].

    Respond only with JSON in this exact format (no surrounding quotes around the array):
    [
      "Reason 1",
      "Reason 2",
      "Reason 3",
      "Reason 4",
      "Reason 5"
    ]
`;

    // try {
    //   const completion = await client.chat.completions.create({
    //     model: MODEL_NAME,
    //     messages: [
    //       {
    //         role: "user",
    //         content: gptQuery,
    //       },
    //     ],
    //   });

    //   const reasons = completion.choices[0]?.message?.content?.trim() || [];

    //   const cleanedReasons = JSON.parse(reasons);

    //   if (cleanedReasons.length > 0) {
    //     dispatch(addReasonsToWatch(cleanedReasons));
    //   } else {
    //     console.warn("No valid reasons to dispatch");
    //   }
    // } catch (error) {
    //   console.error("Error fetching movie recommendations:", error);
    // }

    try {
      const apiResponse = await generateText(gptQuery);

      console.log(apiResponse);

      const reasons = JSON.parse(apiResponse);

      if (reasons.length > 0) {
        dispatch(addReasonsToWatch(reasons));
      } else {
        console.warn("No valid reasons to dispatch");
      }
    } catch (error) {
      console.error("Error fetching movies reasons:", error);
      alert("Failed to fetch movies reasons.");
    }
  };

  useEffect(() => {
    if (movieDetails) {
      dispatch(clearReasonsToWatch());
      fetchGptRecommendationReasons();
    }
  }, [movieDetails]);
};

export default useGptRecommendationReasons;
