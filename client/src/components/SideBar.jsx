import styled from 'styled-components'
import { spacing } from '../utilities/spacing'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faGear, faHouse, faPowerOff, faUser, faIdCard, faBarsProgress } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Register from '../Pages/Register'
import Settings from '../Pages/SettingsPop'
import { useSelector, useDispatch } from 'react-redux'
import {logOut } from '../redux/userSlice'
import { resetTask } from '../redux/taskSlice'

const Container = styled.div`
position:relative;
font-family:'Poppins', sans serif;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;

`
const Wrapper = styled.div`

`

const Top = styled.div`
display:flex;
gap:${spacing.sm};

`

const Logo = styled.div``

const Image = styled.img`
width:${spacing.xl};
height:${spacing.xl};
`

const InfoTitle = styled.div`

`

const Title = styled.h2`
color:#353437;
font-weight:bold;
margin:0;
`

const Span = styled.p`
color:#AAAAAA;
font-size:${spacing.ss};
margin:0;
@media only screen and (min-width:500px){
  font-size:10px;
}

`

// Done with Top Section 

const Middle= styled.div`
margin-top:${spacing.md};

`

const Section1= styled.div`
display:flex;
align-items:center;
gap:${spacing.xs};
`

const Span1= styled.span`
color:#AAAAAA;
font-size:${spacing.s};
`

const Line = styled.div`
width:${spacing.lg};
height:1px;
background-color:#E2E1E2;

`

const Section2= styled.div`
margin-top:${spacing.md};

`

const Items = styled.div`
display:flex;
gap:${spacing.xs};
align-items:center;
margin-bottom:${spacing.md};

&:hover {
padding:${spacing.xs};
background-color:#E9E5F3;
border-radius:10px;
cursor:pointer;
}
`

const Icon = styled.div`

`

const TitleItem= styled.span`
color:#AAAAAA;
&:hover{
  color:#3A0CA3;
}
`

////Done with the Middle block element

const Bottom= styled.div`
margin-top:${spacing.xl}; /// special case of using a large distance between element
`

const Rectangle= styled.div`
width:150px;
height:200px;
background: rgb(58,12,163);
background: linear-gradient(90deg, rgba(58,12,163,0.8407738095238095) 0%, rgba(199,179,246,1) 100%);
border-radius:10px;
padding:20px 10px;
position:relative;
`

const Avatar = styled.div`
width:50px;
height:50px;
border-radius:50%;
overflow:hidden;
display:flex;
align-items:center;
justify-content:center;
`

const Img= styled.img`
width:100%;
heigth:100%;
object-fit:cover;
`
const Name = styled.div`
color:white;
font-size:${spacing.s};
margin-top:${spacing.sm};
`

const Circle= styled.div`
width:50px;
height:50px;
border-radius:50%;
background: rgb(255,255,255);
background: linear-gradient(90deg, rgba(255,255,255,0.40940126050420167) 0%, rgba(255,255,255,0.2553396358543417) 100%);
position:absolute;
top:-8px;
right:-8px;
`

const Circle1= styled.div`
width:50px;
height:50px;
border-radius:50%;
background: rgb(255,255,255);
background: linear-gradient(90deg, rgba(255,255,255,0.40940126050420167) 0%, rgba(255,255,255,0.2553396358543417) 100%);
position:absolute;
bottom:-8px;
left:-8px;
`

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

const Tag = styled.a``

export default function SideBar(){

  const user = useSelector((state)=> state.user.currentUser)
  const dispatch= useDispatch()
  const [openRegister, setOpenRegister]= useState(false)
  const [openSettings, setOpenSettings]=useState(false)

   console.log("user", user)
   const username= user?.user?.username  // Info from AuthGoogle
   const picture= user?.user?.profilePic.url // Info from AuthGoogle
 

   
  const handleClick= ()=>{
    dispatch(logOut())
     dispatch(resetTask())
  }

  return (

    
    <>
    <Container>

     <Wrapper>

       <Top>
        <Image src="./img/logo.png" />

        <InfoTitle>

         <Title>Taskflow</Title>

         <Span>Project Management Admin</Span>
        </InfoTitle>
       </Top>
       <Middle>

       <Section1>

       <Span1>Main Menu</Span1>
       <Line></Line>
       </Section1>
        <Section2>

        <Link to="/" style={{textDecoration:"none"}}>
        <Items>
          <Icon>
          <FontAwesomeIcon icon={faHouse} style={{color:"#808080"}} />
          </Icon>
          <TitleItem>Dashboard</TitleItem>
        </Items>
        </Link>
        <Link to="/" style={{textDecoration:"none"}} >
        <Items>
          <Icon>
          <FontAwesomeIcon icon={faBolt} style={{color:"#808080"}} />
          </Icon>
          <TitleItem>Tasks</TitleItem>
        </Items>
        </Link>
        <Link to="/user" style={{textDecoration:"none"}} >
        <Items>
          <Icon>
          <FontAwesomeIcon icon={faUser} style={{color:"#808080"}} />
          </Icon>
          <TitleItem>Users</TitleItem>
        </Items>
        </Link>
        <Link to="/status" style={{textDecoration:"none"}} >
        <Items>
          <Icon>
          <FontAwesomeIcon icon={faBarsProgress} style={{color:"#808080"}} />
          </Icon>
          <TitleItem>Task Status</TitleItem>
        </Items>
        </Link>
        <Items>
          <Icon>
          <FontAwesomeIcon icon={faGear} style={{color:"#808080"}} />
          </Icon>
          <TitleItem><Tag onClick={()=> setOpenSettings(!openSettings)} >Settings</Tag></TitleItem>
        </Items>
         {user ? ( 
          <Items>
          <Icon>
          <FontAwesomeIcon icon={faPowerOff} style={{color:"#808080"}} />
          </Icon>
          <TitleItem onClick={handleClick} >Logout</TitleItem>
        </Items>
         ) : (
          <Items>
          <Icon>
          <FontAwesomeIcon icon={faIdCard} style={{color:"#808080"}} />
          </Icon>


        <TitleItem> <Tag onClick={()=> setOpenRegister(!openRegister)} >Register</Tag>  / <Link  to="/login" >Sign in</Link> </TitleItem>
        </Items>
        
         )}
        
        </Section2>
       </Middle>

      <Bottom>
      
     {user ? (
       <Rectangle>
       <Avatar>  
       <Img src={user?.profilePic?.url || user.profilePic || picture} />
      
        </Avatar>
       
           <Name>{user.username || username} </Name>
        

       <Circle></Circle>
 
       <Circle1></Circle1>
       
       </Rectangle>
 
     ) : (
      <Rectangle>
  
       <Img src="./img/sign.png" />

      <Circle></Circle>

      <Circle1></Circle1>
      
      </Rectangle>

     )}


      </Bottom> 
     </Wrapper>
     </Container>

     {openRegister &&  // Process to Open de Register Model

    <Model>
     
     <Register  setOpenRegister={setOpenRegister} />
    </Model>
    
     }

    
       
       {openSettings &&  // Process to Open de Settings Model

       <Model>
        <Settings setOpenSettings={setOpenSettings}  />

       </Model>}


     </>
  )

}