import { loginStart, loginSuccess, loginFailure } from "./userSlice";
import axios from 'axios';

export const login= async(dispatch,data)=>{
  
  dispatch(loginStart())
  
 
  try{
    const res= await axios.post('http://localhost:5000/api/auth/login', data, { withCredentials: true })
      dispatch(loginSuccess(res.data))
       //
      
      return true

  }catch(error){
   dispatch(loginFailure(error))
   return false
  
  }
}

