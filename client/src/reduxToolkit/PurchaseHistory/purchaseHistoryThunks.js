import { fetchPurchaseHistorySuccess } from './purchaseHistorySlice';
import axios from 'axios';

export const getPurchaseHistory = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/history/${userId}`);
      const purchaseHistory = response.data;
      console.log(purchaseHistory)
      dispatch(fetchPurchaseHistorySuccess(purchaseHistory));
    } catch (error) {
      console.error('Error fetching purchase history:', error);
    }
  };
};