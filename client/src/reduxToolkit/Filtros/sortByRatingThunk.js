import { sortByRatingSuccess } from "../Product/productSlice";

const API_URL = "https://drewili-pf-back.onrender.com/product/rating";

export const filterRating = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      dispatch(sortByRatingSuccess({ products: data }));
    } catch (error) {
      console.error("Error filtering by rating:", error);

      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Error with the request:", error.request);
      }
    }
  };
};