import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"


export const fetchOrder=createAsyncThunk("order/fetchOrder",
    async()=>{
        const id=localStorage.getItem("id");
        if(id){
            const resp=await axios.get(`http://localhost:5002/users/${id}`);
            return resp.data.order
        }else{
            alert("login to continue")
        }
    }
);

// add orders to users
export const addOrder=createAsyncThunk("order/addOrder",
    async(item)=>{
        const id=localStorage.getItem("id");
        if(id){
            const resp=await axios.get(`http://localhost:5002/users/${id}`);
            const current= resp.data.order;
            const update=[...current,item];
            await axios.patch(`http://localhost:5002/users/${id}`,{order:update});
            await axios.patch(`http://localhost:5002/users/${id}`,{cart:[]});
            return update;
        }else{
            alert("login to continue")
        }
    }
)

const intial={
    status:"idle",
    order:[],
    error:null
}

const orderSlice=createSlice({
    name:"order",
    initialState:intial,
    reducers:{},
    extraReducers:(bundle)=>{
        bundle

        .addCase(fetchOrder.pending, (state) => {
            state.status = "pending";
          })
          .addCase(fetchOrder.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.order = action.payload;
          })
          .addCase(fetchOrder.rejected, (state, action) => {
            state.status = "rejected";
            state.order = [];
            state.error = action.error.message;
          })

        //   orders add

        .addCase(addOrder.pending, (state) => {
            state.status = "pending";
          })
          .addCase(addOrder.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.order = action.payload;
          })
          .addCase(addOrder.rejected, (state, action) => {
            state.status = "rejected";
            state.order = [];
            state.error = action.error.message;
          })
        
    }
})

export default orderSlice.reducer;