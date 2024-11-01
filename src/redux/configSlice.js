import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: {
    lang: "en",
    searchBtnState: false,
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.lang = action.payload;
    },
    toggleSearchBtn: (state) => {
      state.searchBtnState = !state.searchBtnState;
    }
  },
});

export const { changeLanguage, toggleSearchBtn } = configSlice.actions;

export default configSlice.reducer;
