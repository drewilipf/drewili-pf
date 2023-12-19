import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Product/productSlice";
import userReducer from "./User/userSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    users: userReducer,
  }, // falta definir los reducer
});
