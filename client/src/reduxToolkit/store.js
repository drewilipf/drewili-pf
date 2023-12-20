import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Product/productSlice";
import userReducer from "./User/userSlice";
import commentsReducer from "./Comment/commentSlice";
import categoryReducer from "./Category/categorySlice";
import brandReducer from "./Brand/brandSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    users: userReducer,
    comments: commentsReducer,
    categories: categoryReducer,
    brands: brandReducer,
  }, // falta definir los reducer
});
