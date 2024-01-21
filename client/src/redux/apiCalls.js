import { loginStart, loginSuccess, loginFailure } from "./userSlice";
import axios from 'axios';

export const login= async(dispatch,data)=>{
  
  dispatch(loginStart())
  
 
  try{
    const res= await axios.post('https://tired-worm-windbreaker.cyclic.app/api/auth/login', data, { withCredentials: true })
      dispatch(loginSuccess(res.data))
       //
      
      return true

  }catch(error){
    console.error('Login error:', error);
    dispatch(loginFailure(error));
    return false;
  
  }
}

