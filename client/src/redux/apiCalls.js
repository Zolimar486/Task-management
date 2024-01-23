import { publicRequest } from "../request";
import { loginStart, loginSuccess, loginFailure } from "./userSlice";
import axios from 'axios';

export const login= async(dispatch,data)=>{
  
  dispatch(loginStart())
  
 
  try{
    const res= await publicRequest.post('/auth/login', data)
      dispatch(loginSuccess(res.data))
     

  }catch(error){
    console.error('Login error:', error);
    dispatch(loginFailure(error));
    return false;
  
  }
}

