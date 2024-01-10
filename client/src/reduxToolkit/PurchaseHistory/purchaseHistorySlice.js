import { createSlice } from "@reduxjs/toolkit";

const purchaseHistorySlice = createSlice({
  name: "purchaseHistory",
  initialState: {
    history: [],
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchPurchaseHistorySuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    getAllPurchaseHistorySlice: (state, action) => {
      state.history = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { fetchPurchaseHistorySuccess, getAllPurchaseHistorySlice } =
  purchaseHistorySlice.actions;
export default purchaseHistorySlice.reducer;
