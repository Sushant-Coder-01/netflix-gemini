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
      Provide 5 brief reasons (maximum 2 lines each) why someone should watch the movie "${movieName}": 
      1. 
      2. 
      3. 
      4. 
      5. 
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

      const reasons =
        completion.choices && completion.choices.length > 0
          ? completion.choices[0]?.message?.content?.trim() || ""
          : "";

      const cleanedReasons = reasons
        .split("\n")
        .map((reason) => reason.trim())
        .filter((reason) => reason.length > 0 && /^(\d+\.\s)/.test(reason))
        .map((reason) => reason.replace(/^\d+\.\s*/, ""))
        .slice(0, 5);

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
