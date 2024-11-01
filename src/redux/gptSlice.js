import { createSlice } from "@reduxjs/toolkit";

const gptSearchToggleView = createSlice({
  name: "gpt",
  initialState: {
    gptSearchToggleBtn: false,
    searchMoviesInTMDB: null,
    gptRecommandedMovies: null,
    gptPrompt: "",
  },
  reducers: {
    changeGptSearchToggle: (state) => {
      state.gptSearchToggleBtn = !state.gptSearchToggleBtn;
    },
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
    }
  },
});

export const { changeGptSearchToggle, addSearchMoviesInTMDB, addRecommandedMovies, addGptPrompt, setGptPrompt, clearRecommandedMovies , clearSearchMoviesInTMDB } = gptSearchToggleView.actions;

export default gptSearchToggleView.reducer;
