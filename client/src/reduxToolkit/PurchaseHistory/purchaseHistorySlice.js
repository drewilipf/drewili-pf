import { createSlice } from '@reduxjs/toolkit';

const purchaseHistorySlice = createSlice({
  name: 'purchaseHistory',
  initialState: {
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
  },
});

export const { fetchPurchaseHistorySuccess } = purchaseHistorySlice.actions;
export default purchaseHistorySlice.reducer;