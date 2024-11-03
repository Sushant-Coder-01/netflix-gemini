import OpenAI from "openai";
import { MODEL_API_KEY } from "./constants";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: MODEL_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default client;
