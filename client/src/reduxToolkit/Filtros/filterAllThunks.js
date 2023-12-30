import axios from "axios";
import { filterAllSlice } from "../Product/productSlice";

const API_URL = "http://localhost:3001/filterby/filter";

export const filterAll = (category, brand, color, minPrice, maxPrice) => {
  return async (dispatch) => {
    try {
      const queryParams = {};
      if (category) queryParams.category = category;
      if (brand) queryParams.brand = brand;
      if (color) queryParams.color = color;
      if (minPrice !== undefined) queryParams.minPrice = minPrice;
      if (maxPrice !== undefined) queryParams.maxPrice = maxPrice;

      // Construir la cadena de consulta
      const queryString = new URLSearchParams(queryParams).toString();
      console.log(queryString);
      // Concatenar la cadena de consulta a la URL base
      const urlWithParams = `${API_URL}?${queryString}`;
      console.log(urlWithParams);
      const response = await axios.get(urlWithParams);
      console.log('esta es la respuesta', response);
      const products = response.data;
      console.log('estos son los productos', products);

      dispatch(filterAllSlice({ products }));
    } catch (error) {
      console.error("Error filtering :", error.message);

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