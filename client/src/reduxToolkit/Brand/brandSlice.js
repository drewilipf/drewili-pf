import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  brands: [],
};

export const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    getBrandSlice: (state, action) => {
      state.brands = action.payload.brands;
    },
    postBrandSlice: (state, action) => {
      state.brands = action.payload.brands;
    },
  },
});

export const { getBrandSlice, postBrandSlice } = brandSlice.actions;
export default brandSlice.reducer;
