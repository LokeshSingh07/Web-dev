import { createSlice } from "@reduxjs/toolkit";
import { Toast } from "react-hot-toast";
import authSlice from "./authSlice";


const initialState = {
    totalItems: localStorage.getItem("totalItems")? JSON.parse(localStorage.getItem("totalItems")) : 0,
}



const cartSlice  = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setTotalItems(state, value){
            state.totalItems = value.payload
        },

        // add to cart
        // remove from cart
        // reset cart
    }
});



export const {setTotalItems} = cartSlice.actions;
export default cartSlice.reducer;