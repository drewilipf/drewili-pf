import {
  fetchPurchaseHistorySuccess,
  getAllPurchaseHistorySlice,
  putStatusSlice,
} from "./purchaseHistorySlice";
import axios from "axios";

export const getPurchaseHistory = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://drewili-pf-back.onrender.com/history/${userId}`
      );
      
      const purchaseHistory = response.data;
      
      dispatch(fetchPurchaseHistorySuccess(purchaseHistory));
    } catch (error) {
      console.error("Error fetching purchase history:", error);
    }
  };
};
export const getAllPurchaseHistory = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://drewili-pf-back.onrender.com/history`
      );
      const allPurchase = response.data;
      dispatch(getAllPurchaseHistorySlice(allPurchase));
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };
};
export const putStatus = (id, newPaymentStatus) => {
  return async (dispatch) => {
    try {
      const newStatus = newPaymentStatus.newPaymentStatus;

      const response = await axios.put(
        `https://drewili-pf-back.onrender.com/history/update/${id}`,
        newPaymentStatus
      );

      const dataStatus = response.data;

      dispatch(putStatusSlice({ id, newStatus }));
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
};
