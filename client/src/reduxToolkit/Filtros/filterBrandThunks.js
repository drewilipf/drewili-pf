import { filterBrandSuccess } from "../../reduxToolkit/Product/productSlice";
import axios from "axios";

const API_URL = "https://drewili-pf-back.onrender.com/filterby/brand";

export const filterBrand = (brand) => {
  return async (dispatch) => {
    try {
      if (!brand) {
        return;
      }

      const response = await axios.get(API_URL, {
        params: {
          brand: brand,
        },
      });

      const products = response.data;

      

      dispatch(filterBrandSuccess({ products }));
    } catch (error) {
      console.error("Error filtering by brand:", error.message);
    }
  };
};