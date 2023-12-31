import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  copiProducts: [],
  filterPrice: null,
  filterColor: null,
  filterBrand: null,
  filterCategory: null,
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
      state.copiProducts = action.payload.products;
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
      const currentFilterProducts = JSON.parse(JSON.stringify(state.products));

      const filteredProduct = action.payload.products;
      console.log(filteredProduct);
      state.products = currentFilterProducts.filter((product) =>
        filteredProduct.some((product2) => product.id === product2.id)
      );
      state.filterPrice = state.products;

      console.log(state.products);
    },

    filterColorSuccess: (state, action) => {
      const currentFilterProducts = JSON.parse(JSON.stringify(state.products));

      console.log(currentFilterProducts);

      const filteredProduct = action.payload.products;
      console.log(filteredProduct);
      state.products = currentFilterProducts.filter((product) =>
        filteredProduct.some((product2) => product.id === product2.id)
      );
      state.filterColor = state.products;

      console.log(state.products);
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

    deletedProductSlice: (state, action) => {
      state.status = "succeeded";
      state.products = action.payload.products;
    },
    putProductSlice: (state, action) => {
      state.status = "succeeded";
      state.product = action.payload.product;
    },

    filterBrandSuccess: (state, action) => {
      const currentFilterProducts = JSON.parse(JSON.stringify(state.products));

      console.log(currentFilterProducts);
      console.log(state.filterBrand);

      const filteredProduct = action.payload.products;
      console.log(filteredProduct);
      state.products = currentFilterProducts.filter((product) =>
        filteredProduct.some((product2) => product.id === product2.id)
      );
      state.filterBrand = state.products;

      console.log(state.products);
    },
    deletedProductSlice: (state, action) => {
      state.status = "succeeded";
      state.products = action.payload.products;
    },
    putProductSlice: (state, action) => {
      state.status = "succeeded";
      state.product = action.payload.product;
    },

    filterCategorySuccess: (state, action) => {
      const currentFilterProducts = JSON.parse(JSON.stringify(state.products));

      console.log(currentFilterProducts);

      const filteredProduct = action.payload.products;
      console.log(filteredProduct);
      state.products = currentFilterProducts.filter((product) =>
        filteredProduct.some((product2) => product.id === product2.id)
      );
      state.filterCategory = state.products;

      console.log(state.products);
    },
    clearFilterSlice: (state) => {
      state.status = "succeeded";
      state.products = JSON.parse(JSON.stringify(state.copiProducts));
      state.filterCategory = null;
      state.filterColor = null;
      state.filterBrand = null;
      state.filterPrice = null;
      state.filterCategory = null;
    },
    filterAllSlice: (state, action) => {
      state.status = "succeeded";
      state.products = action.payload.products.products;
    },
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
  filterCategorySuccess,
  putProductSlice,
  deletedProductSlice,
  clearFilterSlice,
  filterAllSlice,
} = productSlice.actions;
export default productSlice.reducer;
