import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../api/axiosInstance";

export const RazorOrderCreation = createAsyncThunk(
  "checkout/RazorOrderCreation",
  async (price) => {
    try {
      const res = await axiosInstance.get(
        `/Order/razor-order-create?price=${price}`
      );
      return res.data.data;
    } catch (err) {
      throw new Error(
        err.response?.data.message || "Please check your internet connection"
      );
    }
  }
);

export const RazorPaymentVerify = createAsyncThunk(
  "checkout/RazorPaymentVerify",
  async (params) => {
    try {
      const res = await axiosInstance.post(
        `/Order/razor-payment-verify`,
        params
      );
      return res.data.issuccess;
    } catch (err) {
      throw new Error(
        err.response?.data.message || "Please check your internet connection"
      );
    }
  }
);


export const CreateOrder =createAsyncThunk("checkout/createOrder", 
    async(param)=>{
        try{
const res=await axiosInstance.post(`/Order/Place-order`,param);
return res.data.issuccess;
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
  orderId: null,
  orders: [],
  paymentStatus: null,
  error: null,
};

const CheckoutSlice = createSlice({
  name: "checkout",
  initialState: intial,
  extraReducers: (bundle) => {
    bundle
    //razor creation 
      .addCase(RazorOrderCreation.fulfilled, (state, action) => {
        state.orderId = action.payload;
        console.log(action.payload);
      })
      .addCase(RazorOrderCreation.rejected, (state, action) => {
        state.error = action.payload;
      })

    //payment verify
      .addCase(RazorPaymentVerify.fulfilled, (state, action) => {
        state.paymentStatus = action.payload;
        console.log(action.payload);
      })
      .addCase(RazorPaymentVerify.rejected, (state, action) => {
        state.error = action.payload;
        
      })

      //order create
      .addCase(CreateOrder.fulfilled, (state, action) => {
        state.paymentStatus = action.payload;
        console.log(action.payload);
      })
      .addCase(CreateOrder.rejected, (state, action) => {
        state.error = action.payload;
      })
  },
});
