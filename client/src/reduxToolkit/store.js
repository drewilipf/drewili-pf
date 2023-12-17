import { configureStore } from "@reduxjs/toolkit";
import userReducer from "/reduxToolkit/Slice";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    // Otros slices pueden agregarse aquí si es necesario
  },
});
