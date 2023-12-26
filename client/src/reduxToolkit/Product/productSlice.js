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
    },
    getProductsSuccess: (state, action) => {
      state.status = "succeeded";
      state.products = action.payload.products;
    },
    getProductsFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload.error;
    },
    getProductsByIdslice: (state, action) => {
      state.status = "succeeded";
      state.productsId = action.payload.productsId;
    },
    postProductsSuccess: (state, action) => {
      state.status = "succeeded";
      state.products = action.payload.products;
    },

    searchProductStart: (state) => {
      state.status = "loading";
      state.error = null;
    },
    searchProductSuccess: (state, action) => {
      state.status = "succeeded";
      state.products = action.payload.products;
    },
    searchProductFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload.error;
    },
    filterPriceRequest: (state) => {
      state.status = "loading";
      state.error = null;
    },
    filterPriceSuccess: (state, action) => {
      state.status = "succeeded";
      state.products = action.payload.products;
      state.error = null;
    },
    filterPriceFailure: (state, action) => {
      state.status = "failed";
      state.products = [];
      state.error = action.payload.error;
    },
  },
});

export const {
  getProductsStart,
  getProductsSuccess,
  getProductsFailure,
  postProductsSuccess,
  getProductsByIdslice,
  searchProductStart,
  searchProductSuccess,
  searchProductFailure,
  filterPriceRequest,
  filterPriceSuccess,
  filterPriceFailure,
} = productSlice.actions;
export default productSlice.reducer;
