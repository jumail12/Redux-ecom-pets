import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios  from "axios"


export const fetchUsers=createAsyncThunk("user/fetchUsers", async()=>{
    const resp=await axios.get(`http://localhost:5002/users`);
    return resp.data
});

// add users to server
 export const addUsers=createAsyncThunk("user/addUsers",async(user)=>{
   const resp=await axios.post(`http://localhost:5002/users` , user)
   return resp.data
})


const intial={
    status:"idle",  //loading , fulfilled , rejected
    users:[],
    error:""
}

const userSlice=createSlice({
    name:"user",
    initialState:intial,
    reducers:{},
    extraReducers:(builder)=>{
      builder 
      .addCase(fetchUsers.pending, (state,action)=>{
           state.status="loading"
      })
      .addCase(fetchUsers.fulfilled, (state,action)=>{
         state.status="fulfilled";
         state.users=action.payload
      })
      .addCase(fetchUsers.rejected, (state,action)=>{
        state.status="rejected";
         state.error=action.error.message;
         state.users=[];
      })

    //   add users

    .addCase(addUsers.pending, (state,action)=>{
            state.status="loading"
    })

    .addCase(addUsers.fulfilled, (state,action)=>{
        state.status="fulfilled";
        state.users=action.payload
    })
    .addCase(addUsers.rejected, (state,action)=>{
        state.status="rejected";
         state.error=action.error.message;
         state.users=[];
    })
    }
});

export default userSlice.reducer;
