import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  filterProducts:[],
  productsId: {},
  status: "idle", // "idle", "loading", "succeeded", "failed"
  error: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProductsSuccess: (state, action) => {
      state.status = "succeeded";
      state.products = action.payload.products;
      state.filterProducts=action.payload.products;
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
    searchProductSuccess: (state, action) => {
      state.status = "succeeded";
      state.products = action.payload.products;
    },
    filterPriceSuccess: (state, action) => {
      state.status = "succeeded";
      state.products = action.payload.products;
      state.error = null; 
    },
    filterColorSuccess: (state, action) => {
      state.status = "succeeded";
      state.products = action.payload.products;
    },
    sortByPriceSuccess: (state, action) => {
      const order = action.payload.order;
      console.log("Sorting with order:", order);
      state.status = "succeeded";
      state.products = state.products.slice().sort((a, b) => {
        if (order === "asc") {
          return a.price - b.price;
        } else if (order === "desc") {
          return b.price - a.price;
        }
        return 0;
      });
      console.log("Sorted products:", state.products);
    },
  },
});

export const {
  getProductsSuccess,
  postProductsSuccess,
  getProductsByIdslice,
  searchProductSuccess,
  filterPriceSuccess,
  filterColorSuccess,
  sortByPriceSuccess
} = productSlice.actions;
export default productSlice.reducer;
