import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReasonsToWatch } from "../redux/gptSlice";
import client from "../utils/openai";
import { MODEL_NAME } from "../utils/constants";

const useGptRecommendationReasons = (movieName) => {
  const dispatch = useDispatch();
  const gptReasonsToWatch = useSelector((state) => state.gpt.gptReasonsToWatch);

  const fetchGptRecommendationReasons = async () => {
    const gptQuery = `
    Provide an array of strings containing 5 brief reasons (each a maximum of 1 line) why someone should watch the movie "${movieName}". 
    If unable to provide at least five distinct reasons, respond with an empty array.
    
    Each reason should highlight a unique aspect of the movie that makes it worth watching. Ensure the response is in the following format:
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

      const reasons = completion.choices[0]?.message?.content?.trim() || "[]";

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
    if (!gptReasonsToWatch && movieName) {
      fetchGptRecommendationReasons();
    }
  }, [movieName, gptReasonsToWatch]);

  return gptReasonsToWatch;
};

export default useGptRecommendationReasons;
