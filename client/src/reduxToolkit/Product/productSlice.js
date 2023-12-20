import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  status: "idle", // "idle", "loading", "succeeded", "failed"
  error: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProductsStart: (state) => {
      state.status = "loading";
      state.error = null;
    },
    getProductsSuccess: (state, action) => {
      state.status = "succeeded";
      state.products = action.payload.products;
      
    },
    getProductsFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload.error;
     
    },
    postProductsSuccess: (state, action) => {
      state.status = "succeeded";
      state.products = action.payload.products;
      console.log("State after update:", state.products);
    },
  },
});

export const {
  getProductsStart,
  getProductsSuccess,
  getProductsFailure,
  postProductsSuccess,
} = productSlice.actions;
export default productSlice.reducer;
