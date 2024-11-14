import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

const useGeminiAPI = () => {
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

  const generateText = async (prompt) => {
    setError(null);
    setResponse(null); // Reset previous response

    try {
      // Initialize the Gemini API
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });

      // Generate content based on the prompt
      const result = await model.generateContent(prompt);

      console.log(result.response.text());

      // Await text response and set it in the state
      const textResponse = result.response.text();
      setResponse(textResponse);
      // console.log(textResponse);

      return textResponse; // Return response text for additional processing if needed
    } catch (err) {
      console.error("Error generating text:", err);
      setError("Failed to generate text. Please try again.");
      throw err; // Rethrow error for error handling in the calling component
    } finally {
    }
  };

  return { generateText, response, error };
};

export default useGeminiAPI;
