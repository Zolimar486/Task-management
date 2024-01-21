import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faCaretDown} from '@fortawesome/free-solid-svg-icons'
import { spacing } from '../utilities/spacing'
import { useState } from 'react'
import { Link } from 'react-router-dom'
//import { setSearchQuery, searchTasks} from '../redux/searchSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setSearchResults, setSearchText } from '../redux/searchSlice'

const Container = styled.div`
font-family:'Poppins', sans serif;
padding:0px;
display:flex;
justify-content:space-between;
align-items:center;
flex-wrap:wrap;
position:relative;
z-index:2;
position:sticky;
top:0;


@media only screen and (max-width:768px){
  padding:0px
 
}

@media only screen and (min-width:769px){
  height:80px;
  padding:8px;
  border-radius:18px;
}
`



const Wrapper = styled.div`

  @media only screen and (max-width:768px){
   display:flex;
   justify-content:space-between;
   align-items:center;
  }

  @media only screen and (min-width:768px){
    display:flex;
    align-items:center;
    justify-content:space-between;
    
  }




`

const Left = styled.div``

const Title = styled.h2`
color:#353437;

`

//Done width Left 

// ****
const BurguerMenu= styled.div`
@media only screen and (min-width:769px){
  display:none;
}



`

const Menu = styled.div`
width:25px;
background-color:black;
height:4px;
margin-bottom:2px;
`

//Done with BurguerMenu


//****

const Middle = styled.div`

@media only screen and (max-width:768px){
    overflow:hidden;
    display:flex;
    flex-direction:column;
    gap:10px;
    width:100%;
    max-height: ${({open}) => (open? "300px" :"0px")};
    transition: max-height 0.3s ease-in;
    margin-top:10px;
    background-color:white;
    padding:0px 10px;
}

@media only screen and (min-width:768px){
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:8px;
}

`

const Box= styled.div`

@media only screen and (max-width:768px){
  width:70px;
  height:20px;
  padding:${spacing.xs};
  background-color:white;
  border-radius:10px;
  display:flex;
  gap:2px;
  align-items:center;
  margin-top:20px;

  
}


@media only screen and (min-width:768px){
  width:120px;
  height:20px;
  padding:${spacing.ss};
  background-color:white;
  border-radius:18px;
  display:flex;
  gap:5px;
  align-items:center;
}

@media only screen and (min-width:1024px){
  width:250px;
  height:40px;
  padding:${spacing.sm};
  background-color:white;
  border-radius:18px;
  display:flex;
  align-items:center;
  gap:5px;
  border:1px solid #AAAAAA;
}

@media only screen and (min-width:1440px){
  width:350px;
  height:40px;
  padding:${spacing.sm};
  background-color:white;
  border-radius:18px;
  display:flex;
  align-items:center;
  gap:5px;
  border:1px solid #AAAAAA;
}


`

const Input = styled.input`
color:#AAAAAA;
border:none;
outline:none;

@media only screen and (max-width:768px){
  font-size:12px;
}
`



//* Right

const Right = styled.div`
@media only screen and (max-width:768px){
  display:flex;
  flex-direction:column;
  gap:10px;
  margin-bottom:15px;
}

@media only screen and (min-width:768px){
  display:flex;
  align-items:center;
  gap:${spacing.ss};

}

@media only screen and (min-width:1024px){
  display:flex;
  align-items:center;
  gap:${spacing.sm};
}

@media only screen and (min-width:1440px){
  display:flex;
  align-items:center;
  gap:${spacing.md};
}

`

const BoxLanguage= styled.div`
background-color:#C7B3F6;

@media only screen and (max-width:768px){
  width:50px;
  height:20px;
  padding:${spacing.xs};
  border-radius:10px;
  display:flex;
  align-items:center;
  gap:2px;
}

@media only screen and (min-width:768px){
  width:50px;
  height:20px;
  padding:${spacing.xs};
  border-radius:10px;
  display:flex;
  align-items:center;
  gap:5px;
}

@media only screen and (min-width:1024px){
  width:60px;
  height:30px;
  padding:${spacing.ss};
  border-radius:16px;
  display:flex;
  align-items:center;
  gap:5px;
}



`

const Language= styled.span`

@media only screen and (max-width:768px){
  font-size:12px;
  color:#3A0CA3;
  margin:0px 4px;
}
`

const InfoContainer = styled.div`

@media only screen and (max-width:768px){
  display:flex;
  align-items:center;
  gap:5px;
  
}

@media only screen and (min-width:768px){
  display:flex;
  align-items:center;
  gap:8px;
  
}
`

const CirclImage= styled.div`


  width:30px;
  height:30px;
  border-radius:50%;
  overflow:hidden;
  display:flex;
  align-items:center;
  justify-content:center;

`

const Image = styled.img`
width:100%;
height:100%;
object-fit:cover;
`

const Details= styled.div`
  display:flex;
  flex-direction:column;
  

`

const Name = styled.h4`
color:#353437;

@media only screen and (max-width:768px){
  font-size:10px;
  
  
}
`

const Email = styled.span`

color:#AAAAAA;

@media only screen and (max-width:768px){
  font-size:10px;
  
 

}

@media only screen and (max-width:1024px){
  font-size:10px;
  
 
}

`

const Register = styled.span`
color:#AAAAAA;

@media only screen and (max-width:768px){
  font-size:12px;
  font-weight:bold;
  margin:0px 8px;
  
 
}
`

const Section = styled.div``


export default function Navbar(){

  const [open, setOpen]= useState(false)
  const [colorChange, setColorChange]= useState(false)
  const task = useSelector(state => state.task.tasks)
  const user = useSelector((state) => state.user.currentUser);
  const { searchText, searchResults} = useSelector((state) => state.search);
  const id = user?._id || user?.user?._id;
  const username= user?.user?.username  // To access user information with the new structure 
  const picture= user?.user?.profilePic.url 
  const email = user?.user?.email
  const dispatch= useDispatch()
  

  //starting the process of Searching

  useEffect(() => {
    // Your debounced search logic
    const searchTimeout = setTimeout(() => {
      const regex = new RegExp(searchText, 'i');
      const searchResults = filterTask(task,regex);
      dispatch(setSearchResults(searchResults));
    }, 500);

    return () => clearTimeout(searchTimeout); // Clear the timeout on unmount or when the searchText changes
  }, [dispatch, searchText]);

  

  //Call back function to get the search parameters from users
  const handleChange = (e) => {
    
    
    dispatch(setSearchText(e.target.value));
  };

  const filterTask = (task,regex) => {
    return task?.filter((item) => regex.test(item.title) || regex.test(item.description) || regex.test(item.status));
  };

 
  

  
 

  const handleClick = ()=>{
    if(window.scrollY > 20){
         setColorChange(true)
    }else{
      setColorChange(false)
    }
  }

  window.addEventListener("scroll", handleClick)
  
 

  if (!user) {
    // User data is not available yet
    return null; // Or return a loading indicator
  }

  

  //Fetching the Search paramerts
 

  return(

    
    <Container className={colorChange? "change" :"navbar"} >
     
     <Left>
        <Title>Board</Title>
      </Left>


      <BurguerMenu onClick={()=> setOpen(!open)} >
      <Menu></Menu>
      <Menu></Menu>
      <Menu></Menu>
      </BurguerMenu>
      <Middle open={open} >
        <Box>
        <FontAwesomeIcon icon={faMagnifyingGlass} style={{color:"#808080"}} />

        <Input type="text" placeholder='Search Task...' value={searchText} onChange={handleChange} />
    
        </Box>
      
      <Right>
        <BoxLanguage>
          <Language>En</Language>
          <FontAwesomeIcon icon={faCaretDown} style={{color:"#3A0CA3"}} />
        </BoxLanguage>
         {user ? (
          <InfoContainer>
          <Link to={`/settings/${id}`} >
          <CirclImage>
         <Image src= {user?.profilePic?.url || user.profilePic || picture} />
          </CirclImage>
          </Link>
          <Details>
          <Name>{user.username || username} </Name>
            <Email>{user.email || email} </Email>
          </Details>
        </InfoContainer>
         ) : (
          <InfoContainer>
            <Register>Register/Sign in</Register>
          </InfoContainer>  

         )}
      </Right>
      </Middle>
     

    </Container>
  )

}