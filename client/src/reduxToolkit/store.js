import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Product/productSlice";
import userReducer from "./User/userSlice";
import commentsReducer from "./Comment/commentSlice";
import categoryReducer from "./Category/categorySlice";
import brandReducer from "./Brand/brandSlice";
import colorReducer from "./Color/colorSlice";
import loginReducer from "./Login/loginSlice";
import filterPriceReducer from "./Filtros/filterPriceSlice";
import filterColorReducer from "./Color/colorSlice"; // Agrega el reducer faltante

export const store = configureStore({
  reducer: {
    brand: brandReducer,
    products: productReducer,
    users: userReducer,
    comments: commentsReducer,
    categories: categoryReducer,
    color: colorReducer,
    login: loginReducer,
    filterPrice: filterPriceReducer,
    filterColor: filterColorReducer, // Agrega el reducer faltante
  },
});