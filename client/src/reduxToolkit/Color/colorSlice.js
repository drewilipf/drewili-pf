import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  color: [],
};

export const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    getColorSlice: (state, action) => {
      state.color = action.payload.color;
    },
    postColorSlice: (state, action) => {
      state.color = action.payload.color;
    },
  },
});

export const { getColorSlice, postColorSlice } = colorSlice.actions;
export default colorSlice.reducer;
