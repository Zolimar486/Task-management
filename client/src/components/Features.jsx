import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell , faCalendar, faCommentLines, faMessage, faPlus} from '@fortawesome/free-solid-svg-icons'
import { spacing } from '../utilities/spacing'
import { useState, useEffect } from 'react'
import Create from './Create'



const Container = styled.div`
font-family:'Poppins', sans serif;
background-color:white;
border-radius:14px;
padding:${spacing.sm};
margin-top:${spacing.md};
position:relative;

@media only screen and (max-width:768px){
  margin-top:${spacing.md};
}


@media only screen and (min-width:768px){
  display:grid;
  grid-template-columns:repeat(2,1fr);
  gap:10px;
  
}

@media only screen and (min-width:1024px){
  grid-template-columns: repeat(4, 1fr);
  gap:10px;
}


`

const Wrapper = styled.div`

background-color:${props => props.bg};
padding:${spacing.ss};


@media only screen and (max-width:768px){
  margin-top:${spacing.md};
  display:flex;
  align-items:center;
  flex-direction:column;
  justify-content:center;
}


@media only screen and (min-width:768px){
  display:flex;
  align-items:center;
  border-radius:8px;
  flex:1;
  padding:${spacing.sm}
}


@media only screen and (min-width:1024px){
  
  padding:${spacing.xs}
}

@media only screen and (min-width:1440px){
  
  padding:${spacing.sm};
}
`


const Bell= styled.div`
border-radius:50%;
width:40px;
height:40px;
background: linear-gradient(180deg, #FFCD29 51%, #FFEFBA 99%);
display:flex;
align-items:center;
justify-content:center;
margin:0px 6px;
`

const IconMessage= styled.div`
border-radius:50%;
width:40px;
height:40px;
background: linear-gradient(180deg, #14AE5C 51%, #CBF3DE 99%);
display:flex;
align-items:center;
justify-content:center;
margin:0px 6px;
`

const Calender= styled.div`
border-radius:50%;
width:40px;
height:40px;
background: linear-gradient(180deg, #6A2CF8 62%, #ECE6FB 100%);
display:flex;
align-items:center;
justify-content:center;
margin:0px 6px;
`

const Icons= styled.div`

border-radius:50%;
width:40px;
height:40px;
background: white;
display:flex;
align-items:center;
justify-content:center;
margin:0px 6px;
`

const InfoContainer = styled.div`

@media only screen and (max-width:768px){

  display:flex;
  align-items:center;
  flex-direction:column;
  justify-content:center;
  text-aling:center;
}

`

const Span = styled.h4`
font-weight:semi-bold;
color:#353437;
`

const Desc= styled.p`
color:${props=> props.bg};
font-weight:semi-bold;

@media only screen and (min-width:768px){
  font-size:12px;
}

@media only screen and (min-width:1024px){
  font-size:14px;
}

@media only screen and (max-width:375px){
  font-size:10px;
}


`

const Span1= styled.span`
color:white;

@media only screen and (max-width:768px){
  font-size:12px;
}
@media only screen and (min-width:768px){
  font-size:12px;
}

@media only screen and (min-width:1024px){
  font-size:14px;
}
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

@media only screen and (max-width:768px){
  height:500vh;
}

`

const Onclick= styled.div`
padding:${spacing.ss};
cursor:pointer;

@media only screen and (max-width:768px){
  margin-top:${spacing.md};
  display:flex;
  align-items:center;
  flex-direction:column;
  justify-content:center;
  gap:5px;
}


@media only screen and (min-width:768px){
  display:flex;
  align-items:center;
  border-radius:8px;
  flex:1;
  padding:${spacing.sm}
}


@media only screen and (min-width:1024px){
  
  padding:${spacing.xs}
}

@media only screen and (min-width:1440px){
  
  padding:${spacing.sm};
}


`




export default function Features(){
   const [open, setOpen]= useState(false)

  return(
    
    <>
     
   <Container  >
  
  <Wrapper bg="#FCF6E5" >
   <Bell>
   <FontAwesomeIcon icon={faBell} style= {{color:"white"}} />
   </Bell>

   <InfoContainer>
   <Span>Notifications</Span>
   <Desc bg="#FFCD29" >5 Unread Notifications</Desc>
   </InfoContainer>

  </Wrapper>

  <Wrapper bg="#E1F9EC">
   <IconMessage  >
   <FontAwesomeIcon icon={faMessage} style= {{color:"white"}} />
   </IconMessage>

    <InfoContainer><Span>Messages</Span>
   <Desc  bg="#14AE5C">5 Unread Notifications</Desc>
   </InfoContainer>

  </Wrapper>
  <Wrapper bg="#ECE6FB">
   <Calender  >
   <FontAwesomeIcon icon={faCalendar} style= {{color:"white"}} />
   </Calender>

    <InfoContainer><Span>Calander</Span>
   <Desc  bg="#3A0CA3">5 Unread Notifications</Desc>
   </InfoContainer>

  </Wrapper>
  <Wrapper bg="#3A0CA3;">

   <Onclick onClick={()=> setOpen(!open)} >
   <Icons >
   <FontAwesomeIcon icon={faPlus} style= {{color:"#3A0CA3"}} />
   </Icons>

   <Span1  >Create New Project</Span1>
   
   </Onclick>
  </Wrapper>

 </Container>
   {open && <Model>

    <Create  setOpen={setOpen} />

    </Model >}
 
    </>

  )
}