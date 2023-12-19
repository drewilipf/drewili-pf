import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  categories: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    getCategorySlice: (state, action) => {
      state.categories = action.payload.categories;
    },
    postCategorySlice: (state, action) => {
      state.categories = action.payload.categories;
    },
  },
});

export const { getCategorySlice, postCategorySlice } = categorySlice.actions;
export default categorySlice.reducer;
