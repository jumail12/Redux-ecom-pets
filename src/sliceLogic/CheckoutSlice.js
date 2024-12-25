import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../api/axiosInstance";


//razor order creation
export const RazorOrderCreation = createAsyncThunk(
  "checkout/RazorOrderCreation",
  async (price) => {
    try {
      const res = await axiosInstance.post(
        `/Order/razor-order-create?price=${price}`
      );
      return res.data.data;
    } catch (err) {
      console.log(err);
      throw new Error(
        err.response?.data.message || "Please check your internet connection"
      );

    }
  }
);


//razor verify
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


//order place
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
);

//get order details user
export const UserOrders=createAsyncThunk("checkout/UserOrders",
  async()=>{
    try{
     const res=  await axiosInstance.get(`/Order/GetOrder-Details`);
     return res.data.data;
    }
    catch(err){
      throw new Error(
        err.response?.data.message || "Please check your internet connection"
      );
    }
  }
);


//individual pro buy
export const IndividualProBuy = createAsyncThunk(
  "checkout/IndividualProBuy",
  async ({ proid, param }, { rejectWithValue }) => {
    try {
      // Making the request to the backend with product id and order data
      const res = await axiosInstance.post(`/Order/individual-pro-buy/${proid}`, param);
      return res.data.message; // Return the success message from backend
    } catch (err) {
      return rejectWithValue(
        err.response?.data.message || "Please check your internet connection"
      );
    }
  }
);





const intial = {
  status: null,
  orderId: null,
  orderDetails: [],
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
        // console.log(action.payload+"orde id generated");
      })
      .addCase(RazorOrderCreation.rejected, (state, action) => {
        state.error = action.payload;
      })

    //payment verify
      .addCase(RazorPaymentVerify.fulfilled, (state, action) => {
        state.paymentStatus = action.payload;
        // console.log(action.payload+"payment verified");
      })
      .addCase(RazorPaymentVerify.rejected, (state, action) => {
        state.error = action.payload;
        
      })

      //order create
      .addCase(CreateOrder.fulfilled, (state, action) => {
        state.paymentStatus = action.payload;
        // console.log(action.payload+"order placed");
      })
      .addCase(CreateOrder.rejected, (state, action) => {
        state.error = action.payload;
      })

      //getting user orders
      .addCase(UserOrders.fulfilled,(state,action)=>{
        state.status="fulfilled";
        state.orderDetails=action.payload;
      })
      .addCase(UserOrders.rejected,(state,action)=>{
        state.status="rejected";
        state.error=action.error.message;
      })

      //individu
      .addCase(IndividualProBuy.fulfilled,(state,action)=>{
        state.status="fulfilled";
        state.paymentStatus=action.payload;
      })
      .addCase(IndividualProBuy.rejected,(state,action)=>{
        state.status="rejected";
        state.error=action.error.message;
      })

  },
});


export default CheckoutSlice.reducer;