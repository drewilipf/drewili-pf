import {
  getProductsSuccess,
  getProductsByIdslice,
  postProductsSuccess,
  searchProductSuccess,
  putProductSlice,
  deletedProductSlice,
  filterCategorySuccess,
  clearFilterSlice,
} from "./productSlice";
import axios from "axios";

const API_URL = "https://drewili-pf-back.onrender.com/product";
const SEARCH_API_URL = "https://drewili-pf-back.onrender.com/product/product/";
const CATEGORY_FILTER_API_URL =
  "https://drewili-pf-back.onrender.com/filterby/category";

export const getProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(API_URL);

      const allProducts = response.data;

      const products = allProducts.filter(
        (product) => product.deleted === false
      );

      dispatch(getProductsSuccess({ products }));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
};
export const getAllProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(API_URL);

      const products = response.data;

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
      

      dispatch(postProductsSuccess({ products }));
    } catch (error) {
      console.error("Error create products:", error);
    }
  };
};
export const searchProduct = (keyword) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${SEARCH_API_URL}?keyWord=${keyword}`);

      const products = response.data;
      
      dispatch(searchProductSuccess({ products }));
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };
};

export const filterCategory = (category) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${CATEGORY_FILTER_API_URL}?category=${category}`
      );

      const products = response.data;

      

      dispatch(filterCategorySuccess({ products }));
    } catch (error) {
      console.error("Error filtering by category:", error);

      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Error with the request:", error.request);
      }
    }
  };
};
export const deletedProduct = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      const productId = response.data;
      
      dispatch(deletedProductSlice({ productId }));
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
};
export const putProduct = (id, productData) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, productData);
      const productId = response.data;
      
      dispatch(putProductSlice({ productId }));
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
};
export const clearFilter = () => {
  return async (dispatch) => {
    try {
      await dispatch(clearFilterSlice());
      
    } catch (error) {
      console.error("Error clearing filter:", error);
    }
  };
};
