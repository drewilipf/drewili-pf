import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  productsId: {},
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
      console.log("State after loading:", state);
    },
    getProductsSuccess: (state, action) => {
      state.status = "succeeded";
      state.products = action.payload.products;
      console.log("State after update:", state.products);
    },
    getProductsFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload.error;
      console.log("State after failed:", state);
    },
    getProductsByIdslice: (state, action) => {
      state.status = "succeded";
      state.productsId = action.payload.productsId;
      console.log("State after update:", state.productsId);
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
  getProductsByIdslice,
} = productSlice.actions;
export default productSlice.reducer;
