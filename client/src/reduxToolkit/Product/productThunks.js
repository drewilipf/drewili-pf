import { getProductsSuccess } from "./productSlice";
import axios from "axios";

const API_URL = "http://localhost:3001/product";

export const getProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(API_URL);
      console.log("API Response:", response.data);
      const products = response.data;
      console.log("Products thunks:", products);
      dispatch(getProductsSuccess({ products }));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
};
