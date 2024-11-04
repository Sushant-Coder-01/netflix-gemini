import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    moviesLogo: null,
    movieTrailer: null,
    popularMovies: null,
    topRatedMovies: null,
    upcomingMovies: null,
    trendingMovies: null,
    relatedTrailers: null,
    movieDetails: null,
    genres: null,
    bannerMovie: null,
    similarMovie: null,
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
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addTrendingMovies: (state, action) => {
      state.trendingMovies = action.payload;
    },
    addRelatedTrailers: (state, action) => {
      state.relatedTrailers = action.payload;
    },
    addMovieDetails: (state, action) => {
      state.movieDetails = action.payload;
    },
    addMovieGenres: (state, action) => {
      state.genres = action.payload;
    },
    addBannerMovie: (state, action) => {
      state.bannerMovie = action.payload;
    },
    clearBannerMovie: (state) => {
      state.bannerMovie = [];
    },
    addSimilarMovie: (state, action) => {
      state.similarMovie = action.payload;
    }
  },
});

export const {
  addNowPlayingMovies,
  addMoviesLogo,
  addMovieTrailer,
  addPopularMovies,
  addTopRatedMovies,
  addUpcomingMovies,
  addTrendingMovies,
  addRelatedTrailers,
  addMovieDetails,
  addBannerMovie,
  clearBannerMovie,
  addSimilarMovie,
  addMovieGenres,
} = moviesSlice.actions;

export default moviesSlice.reducer;
