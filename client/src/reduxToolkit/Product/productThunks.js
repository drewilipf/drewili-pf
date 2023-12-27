import {
  getProductsSuccess,
  getProductsByIdslice,
  postProductsSuccess,
  searchProductStart,
  searchProductSuccess,
  searchProductFailure,
  filterCategoryRequest,
  filterCategorySuccess,
  filterCategoryFailure,
} from "./productSlice";
import axios from "axios";

const API_URL = "http://localhost:3001/product";
const SEARCH_API_URL = "http://localhost:3001/product/product/";
const CATEGORY_FILTER_API_URL = "http://localhost:3001/filterby/category";

export const getProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(API_URL);

      const products = response.data;

      console.log(products)

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

      const productsId = response.data;

      dispatch(getProductsByIdslice({ productsId }));
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
};

export const postProducts = (productData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(API_URL, productData);
      const products = response.data;
      console.log(products);

      dispatch(postProductsSuccess({ products }));
    } catch (error) {
      console.error("Error create products:", error);
    }
  };
};
export const searchProduct = (keyword) => {
  return async (dispatch) => {
    try {
      dispatch(searchProductStart());

      const response = await axios.get(`${SEARCH_API_URL}?keyWord=${keyword}`);

      const products = response.data;

      dispatch(searchProductSuccess({ products }));
    } catch (error) {
      console.error("Error searching products:", error);
      dispatch(searchProductFailure({ error }));
    }
  };
};


export const filterCategory = (category) => {
  return async (dispatch) => {
    try {
      dispatch(filterCategoryRequest());

      const response = await axios.get(`${CATEGORY_FILTER_API_URL}?category=${category}`);

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
}; 