import { getCategorySlice, postCategorySlice } from "./categorySlice";
import axios from "axios";

const API_URL = "https://drewili-pf-back.onrender.com/category";

export const getCategory = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(API_URL);

      const categories = response.data;

      dispatch(getCategorySlice({ categories }));
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };
};
export const postCategory = () => {
  return async (dispatch) => {
    try {
      const response = await axios.post(API_URL);

      const categories = response.data;

      dispatch(postCategorySlice({ categories }));
    } catch (error) {
      console.error("Error create category:", error);
    }
  };
};
