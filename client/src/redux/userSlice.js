import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios'
import { userRequest} from '../request'



export const updateUser= createAsyncThunk('user/updateUser', async({data, id})=>{
  
  try {
    
    const res = await userRequest.put(`/users/${id}`, data);
    return res.data;
  } catch (err) {
    console.log('Update User Action Error:', err);
    throw err;
  }

})



const userSlice= createSlice({

  name:"user",

  initialState:{
    currentUser:null,
    loading:false,
    error:false,
  },

  reducers:{
    loginStart:(state)=>{
      state.loading=true;
     
    },

    loginSuccess:(state,action)=>{
      state.currentUser=action.payload;
      state.loading=false;
      state.error=false;

      
   
    },

    loginFailure:(state,action)=>{
      state.currentUser=null;
      state.loading=false;
      state.error=action.payload;
    },

    
    logOut:(state)=>{
      state.currentUser=null;
      state.loading=false;
      state.error=false;
    },

   

  },

  extraReducers:{
    [updateUser.pending]:(state)=>{
      state.loading=true;

    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload; // Extract the user object correctly
       
    },
  
    
    [updateUser.rejected]:(state,action)=>{
      state.loading=false;
      state.error=action.payload;
      
    },

  }
  
  

})


export const {loginStart, loginSuccess, loginFailure,logOut}= userSlice.actions
export default userSlice.reducer