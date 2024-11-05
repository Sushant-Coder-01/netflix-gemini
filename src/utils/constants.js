export const LOGIN_BACKGROUND_IMAGE =
  "https://assets.nflxext.com/ffe/siteui/vlv3/74d734ca-0eab-4cd9-871f-bca01823d872/web/IN-en-20241021-TRIFECTA-perspective_2277eb50-9da3-4fdf-adbe-74db0e9ee2cf_large.jpg";

export const NETFLIX_LOGO =
  "https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

export const USER_AVATAR = null;

export const BELL_ICON =
  "https://img.icons8.com/material-rounded/24/FFFFFF/alarm.png";

export const GET_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.REACT_APP_BEARER_TOKEN,
  },
};

export const IMG_CDN = "https://image.tmdb.org/t/p/w500/";

export const HOME_ICON =
  "https://img.icons8.com/material-outlined/24/FFFFFF/home-page.png";

export const PLAY_ICON =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB9ElEQVR4nO2bPYsTURSGjyJqoSKJSe7znuA0wY8RtLAStLIQsfIPCFrYivoHBC0stbHX0s5WYYWtt7EVUdDCYkUbUVTckSEJExYFXQkkc+4DbzXVebjD3HvuGbNMJpPJZDJbodPp7HP34ymlo2VZ7rQopJR6wEPgq6SqDvARuNPtdvdam3H3IfBuWvjm1M+Ai9ZWgGd/Kn6TiCfAQWsTg8Hg2N8UP5PPkm6a2Q5rA+5+6R8FTFfDC0mnbNlx9+tbETDJT+BBURT7bVmRdOM/BEzzvl5JFlhANXktngNHLKoAjSV8AW6NRqNdFlGAGhEvJZ21qAI0zoakR/Uu04IKqGa21FfNbJtFFKAmqyml0gILqIDvku4WRbHbIgpQI+IVcC6sADUiHvf7/UFYARpL+ARcM7PtIQWoyRpwMrKAStIPSfd7vd6eqAKqSV4DZyILqIBv7n4hrACNsz7XpqwWX0CdK9EF3MsCgq+Ay5EFrM91T6AF/wymlM7PrfgFF/AGOG3zRosnIPRWeC3kYYjIx2GiNkSI2hIjeFN0NWRbnMAXIxthr8aIejlK5OtxYEXSYVsmFH1ExqMPSXn0MbmUUhl6ULJG0tOwo7I1w+HQgbdhh6VrgAO/GZf/ANxu/bj8LHUryt1PSDoU6oeJTCaTyWSsFfwC9tdwrkzSdkgAAAAASUVORK5CYII=";

export const SUPPORTED_LANGUAGES = [
  { identifier: "en", name: "English" },
  { identifier: "hindi", name: "हिंदी" },
  { identifier: "marathi", name: "मराठी" },
  { identifier: "tamil", name: "Tamil" },
  { identifier: "telugu", name: "Telugu" },
  { identifier: "spanish", name: "Spanish" },
  { identifier: "korean", name: "Korean" },
  { identifier: "japanese", name: "Japanese" },
];

export const OPEN_AI_KEY = process.env.REACT_APP_OPEN_AI_KEY;

export const OPENROUTER_GOOGLE_GEMMA_2_9B_45 =
  process.env.REACT_APP_OPENROUTER_GOOGLE_GEMMA_2_9B_45; // google/gemma-2-9b-it:free

export const OPENROUTER_MISTRAL_7B_INSTRUCT_45 =
  process.env.REACT_APP_OPENROUTER_MISTRAL_7B_INSTRUCT_45; //  mistralai/mistral-7b-instruct:free

export const OPENROUTER_HERMES_3_LLAMA_45 =
  process.env.REACT_APP_OPENROUTER_HERMES_3_LLAMA_45; // nousresearch/hermes-3-llama-3.1-405b:free

export const OPENROUTER_OPENCHAT_7b =
  process.env.REACT_APP_OPENROUTER_OPENCHAT_7b; // openchat/openchat-7b:free

export const OPENROUTER_GOOGLE_GEMMA_2_9B_318 =
  process.env.REACT_APP_OPENROUTER_GOOGLE_GEMMA_2_9B_318; // google/gemma-2-9b-it:free

export const OPENROUTER_MISTRAL_7B_INSTRUCT_318 =
  process.env.REACT_APP_OPENROUTER_MISTRAL_7B_INSTRUCT_318; //  mistralai/mistral-7b-instruct:free

export const OPENROUTER_HERMES_3_LLAMA_318 =
  process.env.REACT_APP_OPENROUTER_HERMES_3_LLAMA_318; // nousresearch/hermes-3-llama-3.1-405b:free

export const OPENROUTER_MISTRAL_7B_INSTRUCT_A29 =
  process.env.REACT_APP_OPENROUTER_MISTRAL_7B_INSTRUCT_A29; //  mistralai/mistral-7b-instruct:free

export const MODEL_NAME = "mistralai/mistral-7b-instruct:free";

export const MODEL_API_KEY =
  process.env.REACT_APP_OPENROUTER_MISTRAL_7B_INSTRUCT_A29;
