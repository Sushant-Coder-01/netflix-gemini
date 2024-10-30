import { createSlice } from "@reduxjs/toolkit";

const gptSearchToggleView = createSlice({
    name: "gpt",
    initialState: {
        gptSearchToggleBtn: false,
    },
    reducers: {
        changeGptSearchToggle: (state) => {
            state.gptSearchToggleBtn = !state.gptSearchToggleBtn ;
        }
    }
})

export const {changeGptSearchToggle} = gptSearchToggleView.actions;

export default gptSearchToggleView.reducer;