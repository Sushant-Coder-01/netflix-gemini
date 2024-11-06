import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addReasonsToWatch } from "../redux/gptSlice";
import client from "../utils/openai";
import { MODEL_NAME } from "../utils/constants";

const useGptRecommendationReasons = (movieDetails) => {
  const dispatch = useDispatch();

  const fetchGptRecommendationReasons = async () => {
      
    const gptQuery = `
    Provide exactly and only a JSON array of strings containing 5 brief reasons (each a maximum of 1 line) why someone should watch the movie "${movieDetails?.title}".
    If unable to provide at least five distinct reasons, respond with exactly: [].

    Respond in the following JSON format without any additional text, labels, or explanations:
    [ 
      "reason1",
      "reason2",
      "reason3",
      "reason4",
      "reason5"
    ]
`;

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

      const reasons = completion.choices[0]?.message?.content?.trim() || [];

      const cleanedReasons = JSON.parse(reasons);

      if (cleanedReasons.length > 0) {
        dispatch(addReasonsToWatch(cleanedReasons));
      } else {
        console.warn("No valid reasons to dispatch");
      }
    } catch (error) {
      console.error("Error fetching movie recommendations:", error);
    }
  };

  useEffect(() => {
    if (movieDetails) {
      fetchGptRecommendationReasons();
    }
  }, [movieDetails]);
};

export default useGptRecommendationReasons;
