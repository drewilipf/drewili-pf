import { getSalesCartSlice } from "./salesCartsSlice";
import axios from 'axios'

export const getSalesCart = (userId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`https://drewili-pf-back.onrender.com/salesCart/user/${userId}`);
            const { products, totalCartPrice } = response.data;
            dispatch(getSalesCartSlice({ products, totalCartPrice }))
        } catch (error) {
            console.error('Error al obtener productos del carrito:', error);
        }
    }
}

export const deleteSalesCart = (salesCartId, userId) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`https://drewili-pf-back.onrender.com/salescart/delete`, { params: { id: salesCartId, userId: userId } });
            const { products, totalCartPrice } = response.data
            dispatch(getSalesCartSlice({ products, totalCartPrice }))
        }
        catch (error) {

        }
    }

}
export const updateSalesCart = (salesCartId, updatedQuantity, userId) => {
    return async (dispatch)=>{
        try {
            const response = await axios.put(`https://drewili-pf-back.onrender.com/salescart/update`, { id: salesCartId, quantity: updatedQuantity, userId: userId });
            console.log(response, 'esta es la respuesta de la cantidad');
            const {products, totalCartPrice} = response.data
            dispatch(getSalesCartSlice({products, totalCartPrice}))
        } 
        catch (error) {
            
        }
    }
}
