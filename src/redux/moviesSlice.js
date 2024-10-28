import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    moviesLogo: null,
    movieTrailer: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addMoviesLogo: (state, action) => {
      state.moviesLogo = action.payload;
    },
    addMovieTrailer: (state, action) => {
      state.movieTrailer = action.payload;
    }
  },
});

export const { addNowPlayingMovies, addMoviesLogo, addMovieTrailer } = moviesSlice.actions;

export default moviesSlice.reducer;
