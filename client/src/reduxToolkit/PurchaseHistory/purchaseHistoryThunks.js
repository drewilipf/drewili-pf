import {
  fetchPurchaseHistorySuccess,
  getAllPurchaseHistorySlice,
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
