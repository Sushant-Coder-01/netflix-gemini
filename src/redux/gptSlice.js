import { createSlice } from "@reduxjs/toolkit";

const gptSearch = createSlice({
  name: "gpt",
  initialState: {
    searchMoviesInTMDB: null,
    gptRecommandedMovies: null,
    gptPrompt: "",
    gptReasonsToWatch: null,
    gptGetSimilarMovieNames: null,
  },
  reducers: {
    addSearchMoviesInTMDB: (state, action) => {
      state.searchMoviesInTMDB = action.payload;
    },
    addGptPrompt: (state, action) => {
      state.gptPrompt = action.payload;
    },
    setGptPrompt: (state, action) => {
      state.gptPrompt = action.payload;
    },
    clearSearchMoviesInTMDB: (state) => {
      state.searchMoviesInTMDB = [];
    },
    addRecommandedMovies: (state, action) => {
      state.gptRecommandedMovies = action.payload;
    },
    clearRecommandedMovies: (state) => {
      state.gptRecommandedMovies = [];
    },
    addReasonsToWatch: (state, action) => {
      state.gptReasonsToWatch = action.payload;
    },
    clearReasonsToWatch: (state) => {
      state.gptReasonsToWatch = [];
    },
    addGptGetSimilarMovieNames: (state, action) => {
      state.gptGetSimilarMovieNames = action.payload;
    }
  },
});

export const {
  addSearchMoviesInTMDB,
  addRecommandedMovies,
  addGptPrompt,
  setGptPrompt,
  clearRecommandedMovies,
  clearSearchMoviesInTMDB,
  addReasonsToWatch,
  clearReasonsToWatch,
  addGptGetSimilarMovieNames,
} = gptSearch.actions;

export default gptSearch.reducer;
