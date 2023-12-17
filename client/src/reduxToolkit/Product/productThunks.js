import { getProductsSuccess } from "./productSlice";
import axios from "axios";

const API_URL = "http://localhost:3001/product";

export const getProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(API_URL);
      console.log("API Response:", response.data);
      const products = response.data; // Assuming your data structure has a 'results' property
      console.log("Products thunks:", products);
      dispatch(getProductsSuccess({ products }));
    } catch (error) {
      // Handle errors, log, or dispatch an error action if needed
      console.error("Error fetching products:", error);
      // You might want to dispatch an error action or set an error state in your slice
    }
  };
};
