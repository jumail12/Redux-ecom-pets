import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstance } from "../api/axiosInstance";

// -----------------------------------------
// aaded to cart
export const addedToCart = createAsyncThunk("cart/addedToCart", async (pid) => {
  try {
    const res = await axiosInstance.post(`/Cart/AddToCart/${pid}`);
    return res.data.message;
  } catch (err) {
    throw new Error(
      err.response?.data.message || "Please check your internet connection"
    );
  }
});

// ------------------------------------------

// remove from cart

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (Pid) => {
    try {
      const res = await axiosInstance.delete(`/Cart/DeleteItemFromCart/${Pid}`);
      return res.data.message;
    } catch (err) {
      throw new Error(
        err.response?.data.message || "Please check your internet connection"
      );
    }
  }
);

// -------------------------------------------
// incre

export const incrementQty = createAsyncThunk(
  "cart/incrementQty",
  async (Pid) => {
    try {
      const res = await axiosInstance.patch(
        `/Cart/increment-product-qty/${Pid}`
      );
      return res.data.message;
    } catch (err) {
      throw new Error(
        err.response?.data.message || "Please check your internet connection"
      );
    }
  }
);

// -------------------------------------------
// decrementQty

export const decrementQty = createAsyncThunk(
  "cart/decrementQty",
  async (Pid) => {
    try {
      const res = await axiosInstance.patch(
        `/Cart/decrement-product-qty/${Pid}`
      );
      return res.data.message;
    } catch (err) {
      throw new Error(
        err.response?.data.message || "Please check your internet connection"
      );
    }
  }
);

// ---------------------------------------------

// get from cart
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  try {
    const res = await axiosInstance.get(`/Cart/cartitems`);
    return res.data.data;
  } catch (err) {
    throw new Error(
      err.response?.data.message || "Please check your internet connection"
    );
  }
});

// ----------------------------------------------------



// ----------------------------------------------------

// Initial state
const initial = {
  status: "idle",
  cart: [],
  msg: "",
  error: null,
  totalPrice: null,
};

// Cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState: initial,
  reducers: {
    clear: (state) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder

      // ------------------------------------------

      // add cases
      .addCase(addedToCart.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addedToCart.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.msg = action.payload;
      })
      .addCase(addedToCart.rejected, (state, action) => {
        state.status = "rejected";

        state.error = action.error.message;
      })

      // ----------------------------------

      // cart fetch
      .addCase(fetchCart.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.cart = action.payload.c_items;
        state.totalPrice=action.payload.totalCartPrice;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })

      // ------------------------------------------
      // remove caret itms

      .addCase(removeFromCart.pending, (state) => {
        state.status = "pending";
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.msg = action.payload;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })

      // ------------------------------------
      // increse

      .addCase(incrementQty.pending, (state) => {
        state.status = "pending";
      })
      .addCase(incrementQty.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.msg = action.payload;
      })
      .addCase(incrementQty.rejected, (state, action) => {
        state.status = "rejected";

        state.error = action.error.message;
      })

      // ------------------------------------
      // decrese

      .addCase(decrementQty.pending, (state) => {
        state.status = "pending";
      })
      .addCase(decrementQty.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.msg = action.payload;
      })
      .addCase(decrementQty.rejected, (state, action) => {
        state.status = "rejected";

        state.error = action.error.message;
      })


       
  },
});

export default cartSlice.reducer;
export const { clear } = cartSlice.actions;
