import OpenAI from "openai";
import { OPENROUTER_API_KEY } from "./constants";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: OPENROUTER_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default client;
