// activeFiltersSlice.js

import { createSlice } from "@reduxjs/toolkit";

const activeFiltersSlice = createSlice({
  name: "activeFilters",
  initialState: {
    isFiltering: false,
    selectedBrand: "",
    selectedColor: "",
    minPrice: "0",
    maxPrice: "6000",
  },
  reducers: {
    startFiltering: (state) => {
      state.isFiltering = true;
    },
    stopFiltering: (state) => {
      state.isFiltering = false;
    },
    setBrandFilter: (state, action) => {
      state.selectedBrand = action.payload;
    },
    setColorFilter: (state, action) => {
      state.selectedColor = action.payload;
    },
    setPriceFilter: (state, action) => {
      state.minPrice = action.payload.minPrice;
      state.maxPrice = action.payload.maxPrice;
    },
    clearFilters: (state) => {
      state.isFiltering = false;
      state.selectedBrand = "";
      state.selectedColor = "";
      state.minPrice = "0";
      state.maxPrice = "6000";
    },
  },
});

export const {
  startFiltering,
  stopFiltering,
  setBrandFilter,
  setColorFilter,
  setPriceFilter,
  clearFilters,
} = activeFiltersSlice.actions;

export default activeFiltersSlice.reducer;
