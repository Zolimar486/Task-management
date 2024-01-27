import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPenToSquare,faArrowRight } from '@fortawesome/free-solid-svg-icons'
import {useState, useEffect} from 'react'
import { spacing } from '../utilities/spacing'
import { useSelector, useDispatch } from 'react-redux'
import { getTask, deleteTask, updateTask } from '../redux/taskSlice'
import { userRequest} from '../request'



const Container = styled.div``


const Filter = styled.div`
margin-bottom:${spacing.md}

`

const Title = styled.h3`
color:#3A0CA3;
font-weight:bold;
`

const FilterContainer = styled.div`
display:flex;
align-items:center;
justify-content:space-between;
margin-bottom:${spacing.md};

`





const Wrapper = styled.div`
background-color: #fff;
border: 1px solid #ddd;
border-radius: 8px;
padding: 16px;
box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
margin-bottom: 16px;
transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
cursor:pointer;

&:hover {
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
  transform: translateY(-4px);
}

`

const Space= styled.div`
display:flex;
justify-content:space-between;
align-items:center;

@media only screen and (max-width:767px){
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  gap:8px;
  
}
`

const H3 = styled.h3`

margin-bottom: ${spacing.xs};
color:#353437;
font-size:1.12rem;
background: -webkit-linear-gradient(#3A0CA3, #C7B3F6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
@media only screen and (max-width:768px){
  font-size:1rem;
}
`

const Content= styled.div`
@media only screen and (max-width:768px){
  margin-top:10px;
}

@media only screen and (min-width:768px){
  margin-top:4px;
}

`

const Desc = styled.p`

  color: #333;
  margin-bottom:${spacing.xs};
  width:250px;

  @media only screen and (max-width:375px){
    width:200px;
  }

  @media only screen and (max-width:768px){
    font-size:14px;
  }

  @media only screen and (min-width:768px){
    font-size:14px;
  }
`

const Date = styled.p`
font-size: 0.7rem;
  color: #777;

`

const Status= styled.p`
font-size: 12px;
`



const Select= styled.select`
margin-top:${spacing.xs};

@media only screen and (max-width:768px){
  padding:5px;
}

@media only screen and (min-width:768px){
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline:none;
  font-size: 18px;
  font-family:'Poppins', sans serif;
  width:40%;
}

@media only screen and (max-width:375px){
  width:35%;
}
`

const Option= styled.option`
font-size: 16px;
padding: 5px 10px;
`

const SelectStatus= styled.select`
padding:6px;
font-size:10px;
font-family:'Poppins', sans serif;
`

const OptionStatus= styled.option``

const ButtonContainer = styled.div`
  display: flex;
  align-items:center;
  justify-content:center;
  gap:8px;
 
  @media only screen and (max-width:767px){
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    gap:8px;
    
  }

  
`




const Section = styled.div`
margin-top:${spacing.md};

`

const Box = styled.div`
margin-top:20px; 
display:flex;
align-items:center;
width:120px;
height:20px;
border:1px solid #3A0CA3;
background:#8A5CF3;
padding:12px;
border-radius:20px;
position:relative;

`

const Circle= styled.div`
width:23px;
height:23px;
border-radius:50%;
display:flex;
align-items:center;
justify-content:center;
border:1px solid #3A0CA3;
position:absolute;
top:0;
right:0;
background-color:white;
`

const Button= styled.button`
border:none;
background-color:transparent;
color:white;
cursor:pointer;
`
const Message = styled.p``

const Update= styled.div`
display:flex;
flex-direction:column;
gap:10px;
margin-bottom:5px;

`

const Label = styled.label``

const Input = styled.input`
background-color:#ECE6FB;
padding:6px;
outline:none;
border:none;
width:250px;
`

const Buttons = styled.button`
padding: .4rem 1.3rem;
background-color: #6A2CF8;
color: white;
border: none;
border-radius: 4px;
cursor: pointer;
font-size: 16px;

margin:8px 10px;

&:hover {
  background-color: #C7B3F6;
}
`

const ButtonStatus=styled.button`
border-radius:10px;
padding:.4rem 1rem;
border:none;
color:#8A5CF3;
background-color:white;
margin-top:8px;

&:hover{
  background-color:#C7B3F6;
}

`


export default function Task({item}){
  
  const dispatch = useDispatch()
  const [updateMode, setUpdateMode]= useState({})
  const [title, setTitle]= useState("")
  const [description, setDescription]=useState("")
  const [priority, setPriority]= useState("")
  const user = useSelector((state) => state.user.currentUser) 
  const userId = user?._id ||  user?.user?._id 
  const data= {
    title,
    description,
    priority,
     
   }
   
  
  
 //Delete Task operation
 const handleDelete = (id)=>{
  dispatch(deleteTask(id))
 }

 //Update Task Operation
 const handleUpload = async (id) => {
   
     await dispatch(updateTask({ id, data }));
     
     setUpdateMode(false)
     dispatch(getTask(userId));
  
 };

// The handleUpdateMode to set the updatemode

const handleUpdateMode = (id)=>{

 setUpdateMode((prevState)=> ({
  ...prevState,
   [id]:!prevState[id]
 }))
}

const handleUpdateTaskStatus = async (id) => {
 try {
     
     const res = await userRequest.put(`/task/${id}/status`, { status: "Completed" });
    
    
     dispatch(getTask(userId));
} catch (err) {
     console.log(err);
    throw err;
 }
};






  
  return(
    
    <Container>
     <Wrapper key={item._id}>
          <Space>
         

          {updateMode[item._id]? <Update>

            <Label>Title</Label>
            <Input type="text" onChange={(e)=> setTitle(e.target.value)} />
          </Update>
          : 
          
          <>
            <H3>{item.title} </H3>
          </>  
          }
          
          <ButtonContainer>

            <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#83FFBD", cursor: "pointer", fontSize:"18px" }} onClick={() => {
                handleUpdateMode(item._id);
   
               }} />

            <FontAwesomeIcon icon={faTrashCan} style={{ color: "#FF6262", cursor: "pointer" }} onClick={()=> handleDelete(item._id)} />
            <SelectStatus>
            <OptionStatus >Status</OptionStatus>
            <OptionStatus>Pending</OptionStatus>
            <OptionStatus>In Progress</OptionStatus>
            <OptionStatus>Completed</OptionStatus>
          </SelectStatus>
            
          </ButtonContainer>
          </Space>
          <Content>
          {updateMode[item._id]? <Update>

          <Label>Description</Label>
          <Input type="text" onChange={(e)=> setDescription(e.target.value)} />
             </Update>
          :(
            
            <>
            <Desc>{item.description} </Desc>
            </>
          ) 

          }
          <Date>Due Date: {new window.Date(item.dueDate).toDateString()} </Date>
          {updateMode[item._id]?<Update>

          <Label>Priority</Label>
          <Input type="text" onChange={(e)=> setPriority(e.target.value)} />
           </Update>

            :(
              
              <>
                <Status>Priority {item.priority} </Status> 
              </>
             )  
          }
           
           
       
          
            <ButtonStatus onClick={() => handleUpdateTaskStatus(item._id)}>
              {item.status}
            </ButtonStatus>
          

           {updateMode[item._id] && <Buttons onClick={()=>handleUpload(item._id) } >Update </Buttons>

            }
          </Content>    
  
         
  
          </Wrapper>
        
       

    </Container>
  )
}