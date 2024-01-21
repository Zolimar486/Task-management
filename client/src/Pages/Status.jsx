import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowRight } from '@fortawesome/free-solid-svg-icons'
import SideBar from '../components/SideBar'
import Features from '../components/Features'
import Navbar from '../components/Navbar'
import { spacing } from '../utilities/spacing'
import StatusTask from '../components/StatusTask'

const Container = styled.div`
margin:${spacing.ss};
background: rgb(199,179,246);
background: radial-gradient(circle, rgba(199,179,246,0.19931722689075626) 0%, rgba(191,185,244,0.16290266106442575) 100%);
height:max-content;
border-radius:30px;
padding:${spacing.md};


@media only screen and (min-width:320px){
  margin:10px auto;
  max-width:400px;     // The block element will go from columns to rows
}

@media only screen and (min-width:768px){
  margin:0px 0px;
  max-width:100%;
}

`

const Wrapper = styled.div`
background-color:#F1F6F6;
border-radius:30px;
height:max-content;
padding:${spacing.md};

@media only screen  and (min-width:768px){
  display:flex;
  gap:${spacing.sm};

  
}





`

const Left = styled.div`
background-color:white;
border-radius:30px;
height:max-content;
padding:${spacing.lg} ${spacing.sm};

@media only screen and (min-width:768px){
  flex:1;
}
`

const Right = styled.div`
flex:6;
background-color:transparent;


@media only screen and (max-width:768px){
  margin-top:${spacing.md};
}

`


export default function Status(){
  return(
    
    <Container>

    <Wrapper>
      <Left>
        <SideBar />
      </Left>
      <Right>
        <Navbar/>
        <Features />
        <StatusTask/>
     
        
      </Right>
        
    </Wrapper>

  </Container>


  
    )
   
}