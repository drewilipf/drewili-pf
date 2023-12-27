import { getBrandSlice, postBrandSlice } from "./brandSlice";
import axios from "axios";

const API_URL = "http://localhost:3001/brand";

export const getBrand = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(API_URL);
      const brands = response.data;

      dispatch(getBrandSlice({ brands }));
    } catch (error) {
      console.error("Error fetching Brand:", error);
    }
  };
};
export const postBrand = () => {
  return async (dispatch) => {
    try {
      const response = await axios.post(API_URL);

      const brands = response.data;

      dispatch(postBrandSlice({ brands }));
    } catch (error) {
      console.error("Error create Brand:", error);
    }
  };
};
