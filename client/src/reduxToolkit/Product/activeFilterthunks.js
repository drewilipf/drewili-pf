// thunks.js

import {
  startFiltering,
  stopFiltering,
  setBrandFilter,
  setColorFilter,
  setPriceFilter,
  clearFilters,
} from "./path-to-activeFilters-slice";
import {
  filterBrand,
  filterColor,
  filterPrice,
} from "./path-to-product-thunks";

export const startFilteringProducts = () => (dispatch) => {
  dispatch(startFiltering());
};

export const stopFilteringProducts = () => (dispatch) => {
  dispatch(stopFiltering());
};

export const setBrandFilterAction = (brand) => (dispatch) => {
  dispatch(setBrandFilter(brand));
  dispatch(filterBrand(brand));
};

export const setColorFilterAction = (color) => (dispatch) => {
  dispatch(setColorFilter(color));
  dispatch(filterColor(color));
};

export const setPriceFilterAction = (minPrice, maxPrice) => (dispatch) => {
  dispatch(setPriceFilter({ minPrice, maxPrice }));
  dispatch(filterPrice({ minPrice, maxPrice }));
};

export const clearAllFilters = () => (dispatch) => {
  dispatch(clearFilters());
};
