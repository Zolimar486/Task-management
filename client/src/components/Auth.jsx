import styled from 'styled-components'
import { spacing } from '../utilities/spacing'
import axios from 'axios'
import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth'
import { app } from '../firabase'
import{useDispatch} from 'react-redux'
import { loginSuccess } from '../redux/userSlice'
import { useHistory } from 'react-router-dom'
import {useState} from 'react'

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
  
  const handleGoogle= async()=>{


     try{
      const provider= new GoogleAuthProvider()
      const auth= getAuth(app)
      const result = await signInWithPopup(auth, provider)
      const res= await axios.post('http://localhost:5000/api/auth/google', {
        name:result.user.displayName,
        email:result.user.email,
        photo:result.user.photoURL,
       
      })

    

      const data= res.data      

      dispatch(loginSuccess(data));
      
     data && setMessage(true)
      
     
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