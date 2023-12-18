import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    // Otros slices pueden agregarse aquí si es necesario
  },
});
