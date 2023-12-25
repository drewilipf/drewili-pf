import { filterPriceRequest, filterPriceSuccess, filterPriceFailure } from "../Product/productSlice";
import axios from "axios";

const API_URL = "http://localhost:3001/filterby/price";

export const filterPrice = ({ minPrice, maxPrice }) => {
  return async (dispatch) => {
    try {
      dispatch(filterPriceRequest());

      let url = API_URL;

      if (minPrice !== "") {
        url += `?minPrice=${minPrice}`;
      }

      if (maxPrice !== "") {
        url += `${minPrice !== "" ? "&" : "?"}maxPrice=${maxPrice}`;
      }

      const response = await axios.get(url);

      const products = response.data;

      dispatch(filterPriceSuccess({ products }));
    } catch (error) {
      console.error("Error filtering by price:", error);

      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Error with the request:", error.request);
      }

      dispatch(filterPriceFailure({ error }));
    }
  };
};













// import { filterPriceRequest, filterPriceSuccess, filterPriceFailure } from "./filterPriceSlice";
// import axios from "axios";

// const API_URL = "http://localhost:3001/filterby/price";

// export const filterPrice = ({ minPrice, maxPrice }) => {
//   return async (dispatch) => {
//     try {
//       dispatch(filterPriceRequest());

//       let url = API_URL;

//       if (minPrice !== "") {
//         url += `?minPrice=${minPrice}`;
//       }

//       if (maxPrice !== "") {
//         url += `${minPrice !== "" ? "&" : "?"}maxPrice=${maxPrice}`;
//       }

//       const response = await axios.get(url);

//       const products = response.data;

//       dispatch(filterPriceSuccess({ products }));
//     } catch (error) {
//       console.error("Error filtering by price:", error);

//       if (error.response) {
//         console.error("Response status:", error.response.status);
//         console.error("Response headers:", error.response.headers);
//       } else if (error.request) {
//         console.error("Error with the request:", error.request);
//       }

//       dispatch(filterPriceFailure({ error }));
//     }
//   };
// };



