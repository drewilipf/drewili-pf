import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  filterProducts: [],
  productsId: [],
  status: "idle", // "idle", "loading", "succeeded", "failed"
  error: null,
  product: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProductsSuccess: (state, action) => {
      state.status = "succeeded";
      state.products = action.payload.products;
      //state.filterProducts = action.payload.products;
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
      state.status = "succeeded";
      state.products = state.products.slice().sort((a, b) => {
        if (order === "asc") {
          return a.price - b.price;
        } else if (order === "desc") {
          return b.price - a.price;
        }
        return 0;
      });
    },

    filterBrandSuccess: (state, action) => {
      state.status = "succeeded";
      state.products = action.payload.products;

    },
    deletedProductSlice: (state, action) => {
      state.status = "succeeded";
      state.products = action.payload.products;
    },
    putProductSlice: (state, action) => {
      state.status = "succeeded";
      state.product = action.payload.product;
    },
    filterCategoryRequest: (state) => {
      state.status = "loading";
      state.error = null;
    },
    filterCategorySuccess: (state, action) => {
      state.status = "succeeded";
      state.products = action.payload.products;
      state.error = null; 
    },
  },
  filterCategoryFailure: (state, action) => {
    state.status = "failed";
    state.products = [];
    state.error = action.payload.error; 
  },
});

export const {
  getProductsSuccess,
  postProductsSuccess,
  getProductsByIdslice,
  searchProductSuccess,
  filterPriceSuccess,
  sortByPriceSuccess,
  filterBrandSuccess,
  filterPriceFailure,
  filterColorSuccess,
  filterCategoryFailure,
  filterCategoryRequest,
  filterCategorySuccess,

} = productSlice.actions;
export default productSlice.reducer;
