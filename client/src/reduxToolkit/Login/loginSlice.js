import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  productsId: {},
};
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    postProductsSuccess: (state, action) => {
      state.status = "succeeded";
      state.products = action.payload.products;
      console.log("State after update:", state.products);
    },
  },
});
export const { postProductsSuccess } = productSlice.actions;
export default productSlice.reducer;
