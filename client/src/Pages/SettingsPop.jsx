import styled from 'styled-components'
import { spacing } from '../utilities/spacing'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { updateUser } from '../redux/userSlice'

const Container = styled.div`
background-color:white;
width:400px;
height:550px;
border-radius: 10px;
box-shadow: 0px 0px 20px rgba(106, 44, 248, 0.5); 
margin: 20px;
position:relative;
font-family:'Poppins', sans-serif;
`

const Top = styled.div`
background-color:#E9E5F3;
width:100%;
height:120px;
display:flex;
align-items:center;
justify-content:center;
`



const Position = styled.div`
position:absolute;
top:16%;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
gap:5px;
`

const Upload = styled.div`
display:flex;
align-items:center;
justify-content:end;
gap:4px;
`

const Circle1 = styled.div`
width:80px;
height:80px;
border-radius:50%;
display:flex;
align-items:center;
justify-content:center;
overflow:hidden;


`

const Image = styled.img`
width:100%;
height:100%;

`

const Name = styled.div``

const Span = styled.span`
  font-size:12px;
  color:#808080;

`

//Done with Top


const Bottom = styled.div`
margin-top:${spacing.xxxl};
`


const Form = styled.form`
display:flex;
flex-direction:column;
gap:8px;
padding:15px;

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
color:#808080;
font-weight:semi-bold;
font-size:16px;
outline:none;
border:none;
border-bottom:1px solid #D9D9D9;
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

const Label1 = styled.label`
margin-top:40px;
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
const Message = styled.p`
color:green;
font-weight:semi-bold;

`

export default function SettingsPop({ setOpenSettings }) {

  const [image, setImage] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState(false)
  const user = useSelector((state) => state.user.currentUser)
  const dispatch = useDispatch()

  const id = user?._id ||  user?.user?._id 
  console.log("NEW ID", id)
  
  const picture= user?.user?.profilePic.url 

  const handleUpload = (e) => {
    const file = e.target.files[0]

    TransformFile(file)
  }

  const TransformFile = (file) => {
    const reader = new FileReader()

    if (file) {

      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setImage(reader.result)
      }

    } else {
      setImage("")
    }
  }

 

  const handleSubmit = (e) => {
    e.preventDefault()

    const info = {
      username,
      email,
      password,
      profilePic: image
    }

    dispatch(updateUser({ data: info, id}))
    setMessage(true)


  }

  return (
    <Container>
      <Top>
        <Position>
          <Upload>
            <Circle1>

              {user &&

                <>

                  {image ? <Image src={image} />

                    : (<Image src={user?.profilePic?.url || user.profilePic || picture} />)
                  }

                </>

              }

            </Circle1>
            <Label1 htmlFor='file' >
              <FontAwesomeIcon icon={faArrowUpFromBracket} style={{ color: "#353437", fontSize: "14px", cursor: "pointer" }} />

            </Label1>
            <Input type="file" id="file" style={{ display: "none" }} onChange={handleUpload} />

          </Upload>

          <Name>
            {user &&
              <Span>{user.username} </Span>

            }
          </Name>

        </Position>

      </Top>

      <Bottom>
        <Form onSubmit={handleSubmit} >
          <Items>
            <Label>Username</Label>
            <Input type="text" onChange={(e) => setUsername(e.target.value)} />

          </Items>
          <Items>
            <Label>Email</Label>
            <Input type="email" onChange={(e) => setEmail(e.target.value)} />
          </Items>
          <Items>
            <Label>Password</Label>
            <Input type="password" onChange={(e) => setPassword(e.target.value)} />
          </Items>
          <Button type="submit" >Update Profile</Button>
          {message && <Message>You Profile has been updated</Message>}
        </Form>

        <Circle>
          <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#808080", cursor: "pointer" }} onClick={() => setOpenSettings(false)} />

        </Circle>

      </Bottom>


    </Container>

  )
}