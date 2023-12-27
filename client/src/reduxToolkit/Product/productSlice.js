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
      console.log("State after update:", state.products);
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
    filterColorRequest: (state) => {
      state.status = "loading";
      state.error = null;
    },
    filterColorSuccess: (state, action) => {
      state.status = "succeeded";
      state.products = action.payload.products;
    },
    filterColorFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.errorMessage;
    },
    deletedProductSlice: (state, action) => {
      state.products = action.payload.products;
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
  filterColorFailure,
  filterColorRequest,
  filterColorSuccess,
  deletedProductSlice,
} = productSlice.actions;
export default productSlice.reducer;
