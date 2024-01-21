import styled from 'styled-components'
import { spacing } from '../utilities/spacing'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faCloudArrowUp, faUserSlash } from '@fortawesome/free-solid-svg-icons'
import {useState} from 'react'
import axios from 'axios'
import Auth from '../components/Auth'
import {useHistory} from 'react-router-dom'
import { publicRequest } from '../request'


const Container = styled.div`
  font-family:'Poppins', sans-serif;
  width: 400px; 
  height: 650px; 
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(106, 44, 248, 0.5); 
  margin: 20px;
  padding:40px;
 position:relative;
 z-index:10000;

`

const Wrapper = styled.div`

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


export default function Register({ setOpenRegister }) {

  const [username, setUsername]= useState("")
  const [email, setEmail]=useState("")
  const [password, setPassword]=useState("")
  const [image, setImage]= useState("")
  const [loading, setLoading]= useState(false)
  const [error, setError]= useState(false)
  const history= useHistory()

  const handleUpload= (e)=>{
    const file= e.target.files[0]
    
    transformFile(file)

  }

  const transformFile= (file)=>{
    const reader= new FileReader()

    if(file){
      reader.readAsDataURL(file)
      reader.onloadend=()=>{
        setImage(reader.result)
      }

    }else{
      setImage("")
    }

  }



  const handleSubmit= async(e)=>{
   e.preventDefault()
    setLoading(true)
    try{
      const res= await publicRequest.post('/auth/register', {
        username,
        email,
        password,
        profilePic:image,
        
      })

  
     
       window.location.replace('/login')
      // Resolve the promise to indicate successful registration/login
  
   
  


    }catch(err){
     setError(true)
      
    }

  }


  return (
    <Container>
      <Title>Register</Title>
      <Form onSubmit={handleSubmit} >
        <Items>
          <Label>Username</Label>
          <Input type="text" onChange={(e)=> setUsername(e.target.value)} />
        </Items>
        <Items>
          <Label>Email</Label>
          <Input type="email" onChange={(e)=> setEmail(e.target.value)}  />
        </Items>
        <Items>
          <Label>Password</Label>
          <Input type="password" onChange={(e)=> setPassword(e.target.value)}  />
        </Items>
        <Circle>

          <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#808080", cursor: "pointer" }} onClick={() => setOpenRegister(false)} />
        </Circle>
        <Uploads>
          <Box>
            {image ? (<Image src={image} /> ) 
            : (
              <FontAwesomeIcon icon={faUserSlash} style={{ color: "#3A0CA3", fontSize: "40px" }} />
            )
          }
          </Box>
          <Label htmlFor='file' >
            <FontAwesomeIcon icon={faCloudArrowUp} style={{ color: "#808080", fontSize: "18px", cursor: "pointer" }} />

          </Label>
          <Input type="file" id="file" style={{ display: "none" }} onChange={handleUpload} />
        </Uploads>

        <Button type="submit" >{loading ? "Loading " : "Create an Account"} </Button>
        {error && <Error>Something went wrong</Error>}


        <Auth/>
      </Form>

    </Container>

  )
}