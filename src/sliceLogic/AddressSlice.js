import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../api/axiosInstance";

export const fetchAddress = createAsyncThunk("add/fetchAddress", async () => {
  try {
    const res = await axiosInstance.get(`/Address/GetAddresses`);
    return (await res).data.data;
  } catch (err) {
    throw new Error(
      err.response?.data.message || "Please check your internet connection"
    );
  }
});

export const addNewAddress = createAsyncThunk("add/addNewAddress", async (param) => {
  try {
    const res = await axiosInstance.post(`/Address/Add-new-Address`,param);
    return res.data.message;
  } catch (err) {
    throw new Error(
      err.response?.data.message || "Please check your internet connection"
    );
  }
});

export const deleteAddress= createAsyncThunk("add/deleteAddress", 
    async (id)=>{
        try{
    const res= await axiosInstance.delete(`/Address/delete-address/${id}`);
    return res.data.message;
        }
        catch(err){
            throw new Error(
                err.response?.data.message || "Please check your internet connection"
              );
        }
    }
)

const intial = {
  status: null,
  address: [],
  addMsg: null,
  error: null,
};

const addressSlice = createSlice({
  name: "add",
  initialState: intial,
  extraReducers: (bundle) => {
    bundle
      //fech address
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.address = action.payload;
        state.status = "fulfilled";
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.error = action.error.message;
      })

      //add address
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.addMsg = action.payload;
        state.status = "fulfilled";
      })
      .addCase(addNewAddress.rejected, (state, action) => {
        state.error = action.error.message;
      })

      //delete
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.addMsg = action.payload;
        state.status = "fulfilled";
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.error = action.error.message;
      })
  
  },
});


export default addressSlice.reducer;