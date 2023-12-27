/*import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   products: [], 
   status: "idle",
   error: null,
 };

 const filterCategorySlice = createSlice({
   name: "filtercategory",
   initialState,
   reducers: {
     filterCategoryRequest: (state) => {
       state.status = "loading";
       state.error = null;
     },
     filterCategorySuccess: (state, action) => {
       state.status = "succeeded";
       state.products = action.payload.products; 
       state.error = null;
     },
     filterCategoryFailure: (state, action) => {
       state.status = "failed";
       state.category = [];
       state.error = action.payload.error;
     },
   },
 });

 export const {
   filterCategoryRequest,
   filterCategorySuccess,
   filterCategoryFailure,
 } = filterCategorySlice.actions;

 export default filterCategorySlice.reducer; */