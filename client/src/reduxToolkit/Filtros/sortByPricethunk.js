import { sortByPriceSuccess } from "../Product/productSlice";

const API_URL = "http://localhost:3001/price";

export const filterPrice = ({ minPrice, maxPrice, order }) => {
  return async (dispatch) => {
    try {
      let url = API_URL;

      if (minPrice !== "") {
        url += `?minPrice=${minPrice}`;
      }

      if (maxPrice !== "") {
        url += `${minPrice !== "" ? "&" : "?"}maxPrice=${maxPrice}`;
      }

      dispatch(sortByPriceSuccess({ order }));
    } catch (error) {
      console.error("Error filtering by price:", error);

      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Error with the request:", error.request);
      }
    }
  };
};