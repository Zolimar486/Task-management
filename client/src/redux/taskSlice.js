import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
// Task.jsx

import { userRequest} from '../request'




export const getTask = createAsyncThunk('task/getTask', async(userId)=>{
  try{

    const res = await userRequest.get(`/task/get?userId=${userId}`)
    return res.data

  }catch(err){
    console.log(err)
  }
})


export const createTask = createAsyncThunk('createTask/task', async(data)=>{

  try{
    const res= await userRequest.post('/task/', data)
    console.log("new task", res.data)
    return res.data

  }catch(err){
    console.log(err)
  }

})


export const deleteTask= createAsyncThunk('deleTask/task', async(id)=>{
  try{
    const res = await userRequest.delete(`/task/${id}`)
    return id

  }catch(err){
    console.log(err)
  }

})


export const updateTask = createAsyncThunk('updateTask/task', async({id, data})=> {

  try{
    const res= await userRequest.put(`/task/${id}`, data)
    return id

  }catch(err){
    console.log(err)
  }
})

const taskSlice = createSlice({
  
  name:"task",

  initialState:{
    isFetching:false,
    tasks:[],
    error:false
  },

  reducers:{
    resetTask:(state)=>{
      state.tasks = [];
    }
  },

  extraReducers:{
    [getTask.pending]:(state, action)=>{
     state.isFetching= true;
    },

    [getTask.fulfilled]:(state,action)=>{
      state.isFetching= false;
      state.tasks= action.payload;

    },

    [getTask.rejected]:(state,action)=>{
      state.isFetching= false;
      state.error= true
    },

    
    [createTask.pending]:(state,action)=>{
      state.isFetching= true
    },

    
    [createTask.fulfilled]:(state,action)=>{
      state.isFetching= false;
      state.tasks=action.payload;
    },
   
    
    [createTask.rejected]:(state,action)=>{
      state.isFetching= false;
      state.error= true;
    },

    [deleteTask.pending]:(state,action)=>{
      state.isFetching= true
    },

    [deleteTask.fulfilled]:(state,action)=>{
      state.isFetching= false;
      
      state.tasks=state.tasks.filter((item)=> item._id !== action.payload)
    },

    
    [deleteTask.rejected]:(state,action)=>{
      state.isFetching= false;
      state.error=true;
    },

    [updateTask.pending]:(state,action)=>{
      state.isFetching= true
    },

    [updateTask.fulfilled]:(state,action)=>{
      state.isFetching= false;
      state.tasks=state.tasks.filter((item)=> item._id !== action.payload)
    },

    
    [updateTask.rejected]:(state,action)=>{
      state.isFetching= false;
      state.error=true;
    }
  }
 
})
 
export const {resetTask} = taskSlice.actions

export default taskSlice.reducer;