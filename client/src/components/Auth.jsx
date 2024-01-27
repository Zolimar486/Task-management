import styled from 'styled-components'
import { spacing } from '../utilities/spacing'
import axios from 'axios'
import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth'
import { app } from '../firabase'
import{useDispatch} from 'react-redux'
//import { loginUser } from '../redux/userSlice'
import { useHistory } from 'react-router-dom'
import {useState} from 'react'
import { publicRequest } from '../request'
import { loginSuccess } from '../redux/userSlice'

const Button = styled.button`
padding: 10px;
background-color:red;
color: white;
border: none;
border-radius: 4px;
cursor: pointer;
font-size: 16px;
margin-top:${spacing.md};
&:hover {
  opacity:0.7;
}
`
const Message= styled.p``

export default function Auth(){

  const dispatch= useDispatch()
  const history= useHistory()
  const [message, setMessage]= useState(false)
  
  const handleGoogle= async(e)=>{
    e.preventDefault()
  
     try{
      const provider= new GoogleAuthProvider()
      const auth= getAuth(app)
      const result = await signInWithPopup(auth, provider)
      console.log('Google Auth Result:', result)
      const res= await axios.post('https://tired-worm-windbreaker.cyclic.app/api/auth/google', {
        name:result.user.displayName,
        email:result.user.email,
        photo:result.user.photoURL,
       
      })

    

      const data= res.data  
      
      console.log("data user", data)
      console.log(data);
      dispatch(loginSuccess(data));
      
      window.location.reload()
      
     
      history.push('/');
     
  
      
     }catch(error){
      console.log(error)
     }

    

  }

  return(
    
    <>
    <Button type="button" onClick={handleGoogle}>Continue with Google</Button>

   {message && <Message>You Have Signed up Successfully</Message>}
    </>
    
   
    )
    
}