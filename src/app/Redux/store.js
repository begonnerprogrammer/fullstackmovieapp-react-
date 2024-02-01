'use client'
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./movieslice";
const store=configureStore({
    reducer:{
        cart:cartReducer
    }
})

export default store;

