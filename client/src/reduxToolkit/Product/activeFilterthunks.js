import {
  startFiltering,
  stopFiltering,
  setCategoryFilter,
  setBrandFilter,
  setColorFilter,
  setPriceFilter,
  clearFilters,
} from "./activeFiltersSlice";
export const startFilteringProducts = () => (dispatch) => {
  dispatch(startFiltering());
};

export const stopFilteringProducts = () => (dispatch) => {
  dispatch(stopFiltering());
};
export const setCategoryFilterAction = (category) => (dispatch) => {
  dispatch(setCategoryFilter(category));
};
export const setBrandFilterAction = (brand) => (dispatch) => {
  dispatch(setBrandFilter(brand));
};

export const setColorFilterAction = (color) => (dispatch) => {
  dispatch(setColorFilter(color));
};

export const setPriceFilterAction = (minPrice, maxPrice) => (dispatch) => {
  dispatch(setPriceFilter({ minPrice, maxPrice }));
};

export const clearAllFilters = () => (dispatch) => {
  dispatch(clearFilters());
};
