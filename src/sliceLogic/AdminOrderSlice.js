import { axiosInstance } from "../api/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


//all orders
export const GetAllOrders = createAsyncThunk(
  "admin/order/GetAllOrders",
  async () => {
    try {
      const res = await axiosInstance.get(`/Order/get-order-details-admin`);
      return res.data.data;
    } catch (err) {
      throw new Error(
        err.response?.data?.message || "Please check your internet connection"
      );
    }
  }
);


//order by id
export const OrderByUId = createAsyncThunk(
  "admin/order/OrderByUId",
  async (id) => {
    try {
        const res= await axiosInstance.get(`/Order/GetOrderDetailsAdmin_byuserId/${id}`);
        return res.data.data;
    } catch (err) {
      throw new Error(
        err.response?.data?.message || "Please check your internet connection"
      );
    }
  }
);


//orderstatus
export const OrderStatusAdmin=createAsyncThunk("admin/order/OrderStatusAdmin",
    async(id)=>{
        try{
            const res= await axiosInstance.patch(`/Order/update-order-status/${id}`);
            return res.data.data;
        }
        catch(err){
            throw new Error(
                err.response?.data?.message || "Please check your internet connection"
              );
        }
    }
);


//totalrevenue
export const TotalRevenue=createAsyncThunk("admin/order/TotalRevenue",
  async()=>{
    try{
   const res= await axiosInstance.get(`/Order/Total Revenue`);
   return res.data.data;
    }
    catch(err){
      throw new Error(
        err.response?.data?.message || "Please check your internet connection"
      );
    }
  }
)

//total pro purchased
export const totalProPurchased=createAsyncThunk("admin/order/totalProPurchased",
  async()=>{
    try{
   const res= await axiosInstance.get(`/Order/Total-Products-Saled`);
   return res.data.data;
    }
    catch(err){
      throw new Error(
        err.response?.data?.message || "Please check your internet connection"
      );
    }
  }
)



const intial = {
  status: null,
  allOrders: [],
  ordersById: [],
  res: null,
  error: null,
  revenue:null,
  totalpro:null
};

const AdminOrderSlice = createSlice({
  name: "admin/order",
  initialState: intial,
  extraReducers: (bundle) => {
    bundle
      .addCase(GetAllOrders.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.allOrders = action.payload;
      })
      .addCase(GetAllOrders.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })


      .addCase(OrderByUId.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.ordersById = action.payload;
      })
      .addCase(OrderByUId.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })


      .addCase(OrderStatusAdmin.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.res = action.payload;
      })
      .addCase(OrderStatusAdmin.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })

      .addCase(TotalRevenue.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.revenue = action.payload;
      })
      .addCase(TotalRevenue.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })

      .addCase(totalProPurchased.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.totalpro = action.payload;
      })
      .addCase(totalProPurchased.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
  },
});


export default AdminOrderSlice.reducer;