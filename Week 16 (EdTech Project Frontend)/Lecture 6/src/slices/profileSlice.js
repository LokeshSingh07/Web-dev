import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
}



const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setUser(state, value){
            state.user = value.payload
            localStorage.setItem("user", JSON.stringify(state.user));
        }
    }
})
export const {setUser} = profileSlice.actions;
export default profileSlice.reducer;