import { filterColorSuccess } from "../../reduxToolkit/Product/productSlice";
import axios from "axios";

const API_URL = "https://drewili-pf-back.onrender.com/filterby/color";

export const filterColor = (color) => {
  return async (dispatch) => {
    try {
      if (!color) {
        return;
      }

      const response = await axios.get(API_URL, {
        params: {
          color: color,
        },
      });
      const products = response.data;

      dispatch(filterColorSuccess({ products }));
    } catch (error) {
      console.error("Error filtering by color:", error.message);

      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
        console.error("Response headers:", error.response.headers);
        const errorMessage = error.response.data.message || "Error desconocido";
      } else if (error.request) {
        console.error("Error with the request:", error.request);
      }
    }
  };
};
