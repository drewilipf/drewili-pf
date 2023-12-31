import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  minPrice: "0",
  maxPrice: "10000",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.minPrice = action.payload.minPrice;
      state.maxPrice = action.payload.maxPrice;
    },
    clearFilter: (state) => {
      state.minPrice = "0";
      state.maxPrice = "10000";
    },
  },
});

export const { setFilter, clearFilter } = filterSlice.actions;
export default filterSlice.reducer;