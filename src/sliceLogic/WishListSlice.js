import { axiosInstance } from "../api/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchwishlist = createAsyncThunk(
  "wishlist/fetchwishlist",
  async () => {
    try {
      const res = await axiosInstance.get(`/WishList/GetWhishList`);
      return res.data.data;
    } catch (err) {
      throw new Error(
        err.response?.data?.message || "Please check your internet connection"
      );
    }
  }
);

export const RemoveFromWishlist=createAsyncThunk("wishList/RemoveFromWishlist",
    async(id)=>{
        try{
           const res=await axiosInstance.delete(
            `/WishList/Remove/${id}`
           );

           return res.data.message;
        }
        catch(err){
            throw new Error(
                err.response?.data?.message || "Please check your internet connection"
              );
        }
    }
)

export const addOrRemoveWishlist = createAsyncThunk(
  "wishlist/addOrRemoveWishlist",
  async (id) => {
    try {
      const res = await axiosInstance.post(`/WishList/AddOrRemove/${id}`);
      return res.data.message;
    } catch (err) {
      throw new Error(
        err.response?.data?.message || "Please check your internet connection"
      );
    }
  }
);

const initialState = {
  status: "idle",
  wishlistItems: [],
  error: null,
  message: "",
  removemsg:""
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {}, // Corrected key
  extraReducers: (builder) => {
    builder
      .addCase(fetchwishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchwishlist.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.wishlistItems = action.payload;
      })
      .addCase(fetchwishlist.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })


      .addCase(addOrRemoveWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addOrRemoveWishlist.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.message = action.payload;
      })
      .addCase(addOrRemoveWishlist.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })


      .addCase(RemoveFromWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(RemoveFromWishlist.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.removemsg = action.payload;
      })
      .addCase(RemoveFromWishlist.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export default wishlistSlice.reducer;
