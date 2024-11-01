import OpenAI from "openai";
import {   OPENROUTER_API_KEY_2 } from "./constants";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: OPENROUTER_API_KEY_2,
  dangerouslyAllowBrowser: true,
});

export default client;
