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
    putStatusSlice: (state, action) => {
      const acciones = action.payload;

      const paymentStatus = acciones.newStatus;
      const paymentPdf = acciones.paymentPdf;
      const purchaseId = acciones.id;

      state.history = state.history.map((purchase) =>
        purchase.purchaseId === purchaseId
          ? { ...purchase, paymentStatus, paymentPdf }
          : purchase
      );

      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  fetchPurchaseHistorySuccess,
  getAllPurchaseHistorySlice,
  putStatusSlice,
} = purchaseHistorySlice.actions;
export default purchaseHistorySlice.reducer;
