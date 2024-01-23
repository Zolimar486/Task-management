import styled from 'styled-components'
import { spacing } from '../utilities/spacing'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTask} from '../redux/taskSlice'
import Filters from './Filters'
import Task from './Task'
import Pagination from './Pagination'


const Container = styled.div`
font-family:'Poppins', sans serif;
width:100%;
margin-top:${spacing.lg};
`

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
margin-top:8px;

&:hover {
  background-color: #C7B3F6;
}
`

const ButtonStatu=styled.button`
border-radius:10px;
padding:.4rem 1.3rem;
border:none;
background-color:lightRed;

`

export default function Card() {
  const [filter, setFilter]= useState("")
  const [filterTask, setFilterTask]= useState([])
  const dispatch = useDispatch()
  const userId= useSelector((state)=> state.user.currentUser?._id )
  const [title, setTitle]= useState("")
  const [description, setDescription]=useState("")
  const [priority, setPriority]= useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(2);
  const task = useSelector((state)=> state.task.tasks )
  const { searchText, searchResults} = useSelector((state) => state.search);

// Indexing and carrying out the paginate processs
const indexOfLastTask = currentPage * tasksPerPage;
const indexOfFirstTask = indexOfLastTask - tasksPerPage;

let currentTasks = [];
if (Array.isArray(task)) {
  currentTasks = task.slice(indexOfFirstTask, indexOfLastTask);
} else {
  console.error("Task is not an array or is undefined");
  // Handle the case where task is not an array
  // For instance, you might set a default value or handle the error accordingly
}

const paginate = (pageNumber) => setCurrentPage(pageNumber);


///Feching Data from users

  useEffect(()=>{

   if (userId) {
     dispatch(getTask(userId));
   }
  
  },[dispatch, userId])
   

// Fiter process
 const handleChange= (e)=>{
  const value = e.target.value;

 setFilter({
   [e.target.name]:value
  })

  }

  //* Using UseEffect to filter the Task 

  useEffect(() => {
   
   if (filter) {
    setFilterTask(
       task.filter(item => Object.entries(filter).every(([key,value])=> item[key].includes(value)))
     )
 
  }
 }, [task, filter]);

 


 return (
   <Container>

<Filter>
      <Title>Filter</Title>
      <FilterContainer>
      
      <Select name="priority" onChange={handleChange}>
            <Option >Priority</Option>
            <Option>High </Option>
            <Option>Medium </Option>
            <Option>Low </Option>
       </Select>
         
          <Select name="status" onChange={handleChange} >
            <Option >Status</Option>
            <Option>Pending</Option>
            <Option>In Progress</Option>
            <Option>Completed</Option>
          </Select>
      </FilterContainer>
      <Section>
       <Box>
        <Button onClick={()=> window.location.replace('/')}>My Tasks</Button>
        <Circle>
        <FontAwesomeIcon icon={faArrowRight} style={{color:"#3A0CA3"}} />
        </Circle>
       </Box>
      </Section>
     </Filter>
    
    { filterTask && filterTask.length > 0 ? filterTask.map((item) =>(
      <Filters item ={item} />
    ))
    
    
    : searchText ? searchResults.map((item) => (

      <Task key={item._id} item={item} />
      
    ))
     : (
      // Display all tasks when there are no filters or search results
      
      <>
        
      { currentTasks? currentTasks.map((item)=>(
        <Task key={item._id} item={item} />
        // Pagination controls

      ))
      
     :(
        
        <Message>No Task available</Message>
      )}

      <Pagination
       tasksPerPage={tasksPerPage}
       totalTasks={task?.length}
       paginate={paginate}
      
      />


      </>
     
    )
     }
       
       
    
  
   </Container>
 )

}