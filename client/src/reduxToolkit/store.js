import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Product/productSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
  }, // falta definir los reducer
});
