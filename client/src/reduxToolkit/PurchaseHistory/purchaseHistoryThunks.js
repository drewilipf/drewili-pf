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
      console.log(userId);
      const purchaseHistory = response.data;
      console.log(purchaseHistory);
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
export const putStatus = (id, newPaymentStatus, paymentPdf) => {
  return async (dispatch) => {
    try {
      const newStatus = newPaymentStatus.newPaymentStatus;

      const response = await axios.put(
        `http://localhost:3001/history/update/${id}`,
        newStatus,
        paymentPdf
      );

      const dataStatus = response.data;
      console.log(dataStatus);

      dispatch(putStatusSlice({ id, newStatus }));
    } catch (error) {
      console.error("Error updating purchase:", error);
    }
  };
};
