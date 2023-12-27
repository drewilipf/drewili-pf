/*import { filterCategoryRequest, filterCategorySuccess, filterCategoryFailure } from "./filterCategorySlice";
import axios from "axios";

const API_URL = "http://localhost:3001/filterby/category";

export const filterCategory = (category) => {
  return async (dispatch) => {
    try {
      dispatch(filterCategoryRequest());

      const response = await axios.get(`${API_URL}?category=${category}`);

      const products = response.data;

      console.log(products)


      dispatch(filterCategorySuccess({ products }));
    } catch (error) {
      console.error("Error filtering by category:", error);

      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Error with the request:", error.request);
      }

      dispatch(filterCategoryFailure({ error }));
    }
  };
};*/