import { getProductsSuccess, getProductsByIdslice} from "./productSlice";
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
export const getProductsById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`); 
      console.log("API Response (getProductsById):", response.data);
      const productsId = response.data; 
      console.log("Product thunk (getProductsById):", productsId);
      dispatch(getProductsByIdslice({ productsId})); 
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
};

export const postProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.post(API_URL);
      console.log("API Response:", response.data);
      const products = response.data;
      console.log("Products thunks:", products);
      dispatch(postProductsSuccess({ products }));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
};
