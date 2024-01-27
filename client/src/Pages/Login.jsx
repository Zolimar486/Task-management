import styled from 'styled-components'
import { spacing } from '../utilities/spacing'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faCloudArrowUp, faUserSlash } from '@fortawesome/free-solid-svg-icons'
import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
//import { login } from '../redux/apiCalls'
import { useHistory } from 'react-router-dom'; 
import Auth from '../components/Auth'
//import { loginUser } from '../redux/userSlice'
import {loginStart,loginSuccess, loginFailure} from '../redux/userSlice'




const Model = styled.div`
position:absolute;
top:0;
left:0;
width:100vw;
height:120vh;
background-color: rgba(0, 0, 0, 0.426);
z-index:999;
display:flex;
align-items:center;
justify-content:center;
`

const Container1 = styled.div`
  font-family:'Poppins', sans-serif;
  width: 400px; 
  height: 500px; 
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(106, 44, 248, 0.5); 
  margin: 20px;
  padding:40px;
 position:relative;

`




const Title = styled.h2`
color:#6A2CF8;
font-weight:bold;
text-align:center;
`
const Form = styled.form`
display:flex;
flex-direction:column;
gap:8px;
margin-top:${spacing.md};

`

const Items = styled.div`
display:flex;
flex-direction:column;
gap:3px;
`

const Label = styled.label`
color:#353437;
font-weight:semi-bold;
`

const Input = styled.input`
padding:10px;
border-radius:4px;
border:1px solid #ccc;
color:#808080;
font-weight:semi-bold;
font-size:16px;
outline:none;
transition: border-color 0.2s; 

  &:focus {
    border-color: #6A2CF8; 
  }
`

const Circle = styled.div`
width:30px;
height:30px;
border-radius:50%;
display:flex;
align-items:center;
justify-content:center;
position:absolute;
top:4px;
right:15px;
border:1px solid lightgray;
`

const Uploads = styled.div`
margin-top:${spacing.md};
display:flex;
align-items:center;
gap:10px;
`

const Box = styled.div`
width:100px;
height:100px;
border-radius:8px;
border:1px solid lightgray;
background:#E9E5F3;
padding:5px;
display:flex;
align-items:center;
justify-content:center;
`

const Image = styled.img`
width:100%;
height:100%;

`



const Button = styled.button`
padding: 10px;
background-color: #6A2CF8;
color: white;
border: none;
border-radius: 4px;
cursor: pointer;
font-size: 16px;
margin-top:${spacing.md};
&:hover {
  background-color: #C7B3F6;
}
`
const Error = styled.p`
color:#FF6262;
font-weight:semi-bold;
margin-top:5px;
`
const Icons= styled.div`
position:absolute;
top:3%;
right:5%;
`

const Message = styled.p`
color:green;
font-weight:semi-bold;

`

export default function Login() {
  const [username, setUsername]= useState("")
  const [password, setPassword]= useState("")
  const [message, setMessage]= useState(false)
  const dispatch= useDispatch()

  const {error} = useSelector((state) => state.user)
  const history = useHistory()
  console.log(error)

  const handleSubmit = async(e)=>{
    e.preventDefault()
    
    try {
      const data ={
        username,
        password
      }



      dispatch(loginStart());

    

      const res = await fetch('https://tired-worm-windbreaker.cyclic.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const response = await res.json();
      
      dispatch(loginSuccess(response));
      history.push('/')
      
    } catch (error) {
      dispatch(loginFailure(error));
    }
  
     
   
  }

  return (
    
    <Model>
      <Container1>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit}>
        <Items>
          <Label>Username</Label>
          <Input type="text" onChange={(e)=> setUsername(e.target.value)} />
        </Items>

        <Items>
          <Label>Password</Label>
          <Input type="password" onChange={(e)=> setPassword(e.target.value)} />
        </Items>
        


        <Button type="submit" >Sign in</Button>
        {error && <Error> Wrong Credentials </Error>}
        {message && <Message>You Have signed up successfully</Message>}

        <Auth/>
      </Form>

      <Icons>
       
      <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#808080", cursor: "pointer" , fontSize:"20px"}} onClick={() => window.location.replace('/')} />
      </Icons>
       
    </Container1>
     
    </Model>
  )
}
