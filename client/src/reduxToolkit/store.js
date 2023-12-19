import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Product/productSlice";
import userReducer from "./User/userSlice";
import commentsReducer from "./Comment/commentSlice";
import categoryReducer from "./Category/categorySlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    users: userReducer,
    comments: commentsReducer,
    categories: categoryReducer,
  }, // falta definir los reducer
});
