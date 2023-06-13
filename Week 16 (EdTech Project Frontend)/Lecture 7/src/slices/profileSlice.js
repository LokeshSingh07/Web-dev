import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loading: false,
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
}



const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setUser(state, value){
            state.user = value.payload
        },
        setLoading(state, actions){
            state.loading = actions.payload
        }
    }
})
export const { setUser, setLoading,  } = profileSlice.actions;
export default profileSlice.reducer;