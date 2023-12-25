import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  status: "idle", // "idle", "loading", "succeeded", "failed"
  error: null,
};

const filterPrice = createSlice({
    name: "filterprice",
    initialState,
    reducers: {
      filterPriceRequest: (state) => {
        state.status = "loading";
        state.error = null;
      },
      filterPriceSuccess: (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.products;
        state.error = null; // Limpiar el error
      },
      filterPriceFailure: (state, action) => {
        state.status = "failed";
        state.products = [];
        state.error = action.payload.error; // Asegúrate de que solo contenga el mensaje de error
      },
    },
  });

export const {
  filterPriceRequest,
  filterPriceSuccess,
  filterPriceFailure,
} = filterPrice.actions;

export default filterPrice.reducer;