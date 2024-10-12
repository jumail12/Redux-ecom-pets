import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {ToastContainer,toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

// Initial state
const initial = {
  status: "idle",
  cart: [],
  error: null,
};

// Get user ID from localStorage

const userId = localStorage.getItem("id");

// -----------------------------------------
// aaded to cart
export const cartGet = createAsyncThunk("cart/cartGet", async (item) => {
 
  const resp = await axios.get(`http://localhost:5002/users/${userId}`);
  const currentCart= resp.data.cart; 

  const exist=currentCart.find((pro)=>pro.id===item.id);

  if(exist){
   
    toast.warn("item already in your cart")
  }else{
    const updatedCart=[...currentCart,item]
    await axios.patch(`http://localhost:5002/users/${userId}`,{cart:updatedCart})
    toast.success("item added to your cart")
    return updatedCart;
  }

});

// ------------------------------------------

// remove from cart

export const removeFromCart = createAsyncThunk("cart/removeFromCart",
   async (id) => {
 if(userId){
  const resp = await axios.get(`http://localhost:5002/users/${userId}`);
  const currentCart= resp.data.cart; 

  const exist=currentCart.find((pro)=>pro.id===id);

  if(exist){
    const remove=currentCart.filter((item)=>item.id!==id)
    await axios.patch(`http://localhost:5002/users/${userId}`,{cart:remove})
    
    return remove;
    
  }else{
       alert("item not exist")
  }
 }
});

// -------------------------------------------
// incre

export const incrementQty = createAsyncThunk("cart/incrementQty",
  async (id) => {
if(userId){
  const resp = await axios.get(`http://localhost:5002/users/${userId}`);
  const currentCart= resp.data.cart; 
 
  const product=currentCart.find((pro)=>pro.id===id);
 
  if(product){
    const updateProduct={...product,qty:product.qty+=1}
    const updatedCart=currentCart.map((item)=>item.id===id? updateProduct : item)
 
    await axios.patch(`http://localhost:5002/users/${userId}`,{cart:updatedCart})
    
    return updatedCart;
    
  }else{
       alert("item not exist")
  }
}
});

// -------------------------------------------
// decrementQty

export const decrementQty = createAsyncThunk("cart/decrementQty",
  async (id) => {
if(userId){
  const resp = await axios.get(`http://localhost:5002/users/${userId}`);
  const currentCart= resp.data.cart; 
 
  const product=currentCart.find((pro)=>pro.id===id);
 
  if(product){
    const updateProduct={...product,qty:(product.qty<2?product.qty=1 : product.qty-=1)}
    const updatedCart=currentCart.map((item)=>item.id===id? updateProduct : item)
    
    await axios.patch(`http://localhost:5002/users/${userId}`,{cart:updatedCart})
    
    return updatedCart;
    
  }else{
       alert("item not exist")
  }
}
});


// ---------------------------------------------

// get from cart
export const fetchCart=createAsyncThunk("cart/fetchCart" , async()=>{
    if(userId){
      const resp=await axios.get(`http://localhost:5002/users/${userId}`);
      return (await resp).data.cart;
    }
})

// ----------------------------------------------------

// Cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState: initial,
  reducers: {
    clear:(state)=>{
      state.cart=[]
    }
  },
  extraReducers: (builder) => {
    builder

    // ------------------------------------------

      // cartGet cases
      .addCase(cartGet.pending, (state) => {
        state.status = "pending";
      })
      .addCase(cartGet.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.cart = action.payload;
      })
      .addCase(cartGet.rejected, (state, action) => {
        state.status = "rejected";
        state.cart = [];
        state.error = action.error.message;
      })

      // ----------------------------------

      // cart fetch
      .addCase(fetchCart.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "rejected";
        state.cart = [];
        state.error = action.error.message;
      })

      // ------------------------------------------
      // remove caret itms

      .addCase(removeFromCart.pending, (state) => {
        state.status = "pending";
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.cart = action.payload;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = "rejected";
        state.cart = [];
        state.error = action.error.message;
      })

      // ------------------------------------
      // increse

     

      .addCase(incrementQty.pending, (state) => {
        state.status = "pending";
      })
      .addCase(incrementQty.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.cart = action.payload;
      })
      .addCase(incrementQty.rejected, (state, action) => {
        state.status = "rejected";
        state.cart = [];
        state.error = action.error.message;
      })

           // ------------------------------------
      // decrese

     

      .addCase(decrementQty.pending, (state) => {
        state.status = "pending";
      })
      .addCase(decrementQty.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.cart = action.payload;
      })
      .addCase(decrementQty.rejected, (state, action) => {
        state.status = "rejected";
        state.cart = [];
        state.error = action.error.message;
      })
  },
});

export default cartSlice.reducer;
export const {clear}=cartSlice.actions;
