"use client"
import {createSlice} from "@reduxjs/toolkit"


const movieSlice=createSlice({
    name:"Cart",
    initialState:[],
    reducers:{
        add(state,action){
            state.push(action.payload)
        },
        remove(state,action){
          return state.filter((item)=>item.id !== action.payload);
        }
    }
})

export const {add,remove}=movieSlice.actions;
export default movieSlice.reducer;