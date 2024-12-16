import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../api/axiosInstance";

export const loginUser = createAsyncThunk("user/loginUser", async (data) => {
  try {
    const resp = await axiosInstance.post("/Auth/Login", data);
    return resp.data;
  } catch (er) {
    throw new Error(
      er.response?.data || "Please check your internet connection"
    );
  }
});

export const addUsers = createAsyncThunk("user/addUsers", async (user) => {
  try {
    const resp = await axiosInstance.post(`/Auth/Register`, user);
    return resp.data; // Return the response message
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Please check your internet connection"
    );
  }
});

const initialState = {
  status: "idle", // "loading", "fulfilled", "rejected"
  registerData: null,
  loginStatus: false,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut:(state)=>{
     state.loginStatus=false;
    }
  },
  extraReducers: (builder) => {
    builder

      //login
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.status = "fulfilled";
        state.loginStatus = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })

      //register
      .addCase(addUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addUsers.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.registerData = action.payload;
      })
      .addCase(addUsers.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export const {logOut}=userSlice.actions;
export default userSlice.reducer;
