import { configureStore } from "@reduxjs/toolkit";
import CounterSlice from "./slices/CounterSlice";



export const Store = configureStore({
    reducer : {
        counter : CounterSlice,
    },
})