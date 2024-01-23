import styled from 'styled-components'
import { spacing } from '../utilities/spacing'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faCloudArrowUp, faUserSlash } from '@fortawesome/free-solid-svg-icons'
import {useState, useEffect} from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { createTask } from '../redux/taskSlice'
import {useDispatch, useSelector} from 'react-redux'
import { getTask } from '../redux/taskSlice'
import axios from 'axios'
import { userRequest } from '../request'

const Container = styled.div`
font-family:'Poppins', sans-serif;
width: 450px; 
height: 550px; 
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



const RadioGroup = styled.div`
  display: flex;
  flex-direction: row;
`;

const RadioButton = styled.label`
  display: flex;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
  
  @media only screen and (max-width:768px){
    font-size:10px;
  }
`;

const RadioInput = styled.input`
  margin-right: 5px;
`;


export default function Create({setOpen}){

  const [title, setTitle]= useState("")
  const [description, setDescription]=useState("")
  const [priority, setPriority]=useState("")
  const [dueDate, setDueDate] = useState(null);
  const [loading, setLoading]= useState(false)
  const [status, setStatus] = useState("")
  const dispatch= useDispatch()
  const user= useSelector((state)=> state.user.currentUser?._id)


  

  const handleStatusChange= (e)=>{

    setStatus(e.target.value)

  }


  
  const handleSubmit= async ()=>{

    setLoading(true)
    try{

      const data= {
        title,
        description,
        priority,
        dueDate:dueDate,
        status,
        user
      }
    
      console.log('Task Data:', data); //
      await dispatch(createTask(data));

      console.log('Task created successfully'); 
      
      setOpen(false);
    

    }catch(err){
      console.log(err)
    }

  }

  

 
  return(


    
    <Container>
      <Title>Create Task</Title>
      <Form onSubmit={handleSubmit} >
        <Items>
          <Label>Title</Label>
          <Input type="text" onChange={(e)=> setTitle(e.target.value)} />
        </Items>
        <Items>
          <Label>Description</Label>
          <Input type="text" onChange={(e)=> setDescription(e.target.value)}  />
        </Items>
        <Items>
          <Label>Priority</Label>
          <Input type="text" onChange={(e)=> setPriority(e.target.value)}  />
        </Items>
        <Items>
          <Label>Status</Label>
          <RadioGroup>
          <RadioButton  >
        <RadioInput
          type="radio"
          value="incomplete"
          checked={status === "incomplete"} // Check if status matches
          onChange={ handleStatusChange} 
        />
        Incompleted
      </RadioButton>
    
      
      <RadioButton  >
        <RadioInput
          type="radio"
          value="pending"
          checked={status === "pending"} // Check if status matches
          onChange={handleStatusChange} 
        />
        Pending
      </RadioButton>
      
      <RadioButton  >
        <RadioInput
          type="radio"
          value="completed"
          checked={status === "completed"} // Check if status matches
          onChange={handleStatusChange} 
        />
        Completed
      </RadioButton>
    </RadioGroup>
        </Items>
        <Items>
          <Label>Due Date: </Label>
          <DatePicker
            selected={dueDate}
              onChange={(date) => setDueDate(date)}
              showTimeSelect
              dateFormat="Pp"
              style={{
                border:'1px solid #ccc',
                borderRadius:'5px',
                padding:'5px',
              }}
             />
        </Items>
        <Circle>

          <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#808080", cursor: "pointer" }} onClick={() => setOpen(false)} />
        </Circle>
    
          
         

        <Button type="submit" >{loading ? "Loading " : "Create Task"} </Button>
        


     
      </Form>

    </Container>
  )
}