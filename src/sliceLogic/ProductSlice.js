import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

// fetchProducts

export const fetchProducts=createAsyncThunk("products/fetchProducts",async()=>{
    const resp=await axios.get(`http://localhost:5002/products`)
    return resp.data;
})

const intil={
    status:"idle",
    products:[],
    error:null
}

const productSlice=createSlice({
    name:"products",
    initialState:intil,
    reducers:{},
    extraReducers:(bundle=>{
        bundle
        .addCase(fetchProducts.pending , (state,action)=>{
            state.status="loading"
        })
        .addCase(fetchProducts.fulfilled,(state,action)=>{
            state.status="fulfilled";
            state.products=action.payload;
            state.error=null;
        })
        .addCase(fetchProducts.rejected,(state,action)=>{
            state.status="rejected";
            state.products=[]
            state.error=action.error.message;
        })
    })
})

export default productSlice.reducer
