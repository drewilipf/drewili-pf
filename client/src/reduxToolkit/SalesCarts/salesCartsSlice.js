import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    salesCart:[],
    priceTotal: 0,
    status: "idle",
    error: null
}

export const cartSlice = createSlice({
    name: 'salesCart',
    initialState,
    reducers:{
        getSalesCartSlice: (state,action)=>{
            const { products, totalCartPrice } = action.payload;
            state.salesCart = products
            state.priceTotal = totalCartPrice
        },
    }
})

export const {getSalesCartSlice, deleteSalesCartSlice, updateSalesCartSlice} = cartSlice.actions
export default cartSlice.reducer