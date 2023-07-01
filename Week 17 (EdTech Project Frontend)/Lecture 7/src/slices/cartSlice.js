import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";





const initialState = {
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    totalAmount : localStorage.getItem("totalAmount") ? JSON.parse(localStorage.getItem("totalAmount")) : 0,
    totalItems: localStorage.getItem("totalItems")? JSON.parse(localStorage.getItem("totalItems")) : 0,
}



const cartSlice  = createSlice({
    name: "cart",
    initialState,
    reducers: {
        
        // add to cart
        addToCart : (state, action)=>{
            const course = action.payload;
            const index = state.cart.findIndex((item)=> item._id === course._id);

            // if the course is already in the cart, do not modify the qunatity
            if(index >= 0){
                toast.error("Course already in cart");
                return;
            }

            // if the course is not in the cart, add it to the cart
            state.cart.push(course);

            // update the quantity and price
            state.totalItems++;
            state.totalAmount += course.price;

            // update to local Storage
            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
            
            // show toast
            toast.success("Course added to cart");
        },


        // remove from cart
        removeFromCart : (state, action)=>{
            const courseId = action.payload;
            const index = state.cart.findIndex((item)=> item._id === courseId);

            if(index >= 0){
                // If the course is found in the cart, remove it
                state.totalItems--;
                state.totalAmount -= state.cart[index].price;
                state.cart.splice(index,1)

                // update to the local Storage
                localStorage.setItem("cart", JSON.stringify(state.cart));
                localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount));
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

                // show toast
                toast.success("Course removed from cart");
            }
        },


        // reset cart
        resetCart: (state)=>{
            state.cart = [];
            state.totalAmount = 0;
            state.totalItems = 0;

            // update the local Storage
            localStorage.removeItem("cart");
            localStorage.removeItem("totalAmount");
            localStorage.removeItem("totalItems");
        }
    }
});



export const {addToCart, removeFromCart, resetCart} = cartSlice.actions;
export default cartSlice.reducer;