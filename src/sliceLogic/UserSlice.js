import { axiosInstance } from "../api/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//get all users
export const getAllUsers = createAsyncThunk("user/getAllUsers", async () => {
  try {
    const res = await axiosInstance.get(`/User/gett-all-users`);
    return res.data.data;
  } catch (err) {
    throw new Error(
      err.response?.data?.message || "Please check your internet connection"
    );
  }
});

//get by id
export const getUserById = createAsyncThunk("user/getUserById", async (id) => {
  try {
    const res = await axiosInstance.get(`/User/userbyId/${id}`);
    return res.data.data;
  } catch (err) {
    throw new Error(
      err.response?.data?.message || "Please check your internet connection"
    );
  }
});

export const blockOrUnblock = createAsyncThunk(
  "user/blockOrUnblock",
  async (id) => {
    try {
      const res = await axiosInstance.patch(`/User/block/unblock${id}`);
      return res.data;
    } catch (err) {
      throw new Error(
        err.response?.data?.message || "Please check your internet connection"
      );
    }
  }
);

const intial = {
  status: null,
  users: [],
  userI: {},
  error: null,
  resStatus: null,
};

const userAdminSlice = createSlice({
  name: "user",
  initialState: intial,
  extraReducers: (bundle) => {
    bundle
      //get all users
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })

      //get user by id
      .addCase(getUserById.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.userI = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })

      //block
      .addCase(blockOrUnblock.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.resStatus = action.payload.msg;
      })
      .addCase(blockOrUnblock.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});


export default userAdminSlice.reducer;