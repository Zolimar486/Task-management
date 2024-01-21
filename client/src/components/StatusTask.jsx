import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { spacing } from '../utilities/spacing'
import { status } from '../Dummy/task'
import {useState} from 'react'


const Container = styled.div`

font-family:'Poppins', sans serif;
background-color:white;
height:100vh;
border-radius:18px;
padding:20px;
margin-top:${spacing.lg};
border-radius:40px;

`
const Title = styled.h3`
margin:0px;
color:#353437;

`

const Wrapper = styled.div`
background: radial-gradient(#ffff 0%, #C7B3F6 100%);
border-radius:40px;
height:80vh;
background-size:cover;
position:relative;
display:flex;
align-items:center;
justify-content:center;
margin-top:${spacing.md};

@media only screen and (max-width:768px){
  height:75vh;
}


@media only screen and (max-width:375px){
  height:50vh;
  
}
`

const Section = styled.div`


`

const WrapperImage = styled.div`

`

const Box = styled.div`

border:1px solid lightgray;
width:250px;
height:80px;
padding:10px;
border-left:7px solid #6A2CF8;
background-color:white;
border-radius:8px;

@media only screen and (max-width:768px){
  width:150px;
  height:60px;

}

`

const Line = styled.div``

const Task = styled.h3`
color:#353437;
`

const Total = styled.p`
color:#808080;
@media only screen and (max-width:768px){
  font-size:10px;
}
`

const Span = styled.span`
color:#6A2CF8;
`

const InfoIcon = styled.div`
position:absolute;
left:80%;
top:50%;

@media only screen and (min-width:1024px){
  left:70%;
  
}
`

const Circle = styled.div`
width:40px;
height:40px;
border-radius:50%;
background-color:#8A5CF3;
display:flex;
align-items:center;
justify-content:center;
color:white;
cursor:pointer;
`
const Picture = styled.img`


@media only screen and (max-width:768px){
  width:150px;
  height:150px;
}


@media only screen and (min-width:768px){
  width:300px;
  height:300px;
}

`

const Circle1= styled.div`
width:80px;
height:80px;
border-radius:50%;
background: rgb(58,12,163);
background: linear-gradient(90deg, rgba(58,12,163,0.7791491596638656) 0%, rgba(199,179,246,1) 100%);
position:absolute;
top:-8px;
left:0px;

`

export default function StatusTask() {

  
  const [activatedIndex, setActivateIndex]= useState(0)

  const handleClick= ()=>{
    setActivateIndex((prev)=> (prev + 1) % status.length)
  }

  const task= status[activatedIndex]

  
  return (

    <Container>

      <Title>Task Summary</Title>
      <Wrapper>
        <Section>

          <WrapperImage>

            <Picture src={task.img} />
            
          </WrapperImage>
            <Box>
              <Task>Task Status</Task>
              <Total> {task.status}: <Span>{task.number} </Span> </Total>

            </Box>
            <InfoIcon>
              <Circle  >
                <FontAwesomeIcon icon={faArrowRight} onClick={handleClick} />
              </Circle>
            </InfoIcon>

        </Section>
        <Circle1></Circle1>
      </Wrapper>





    </Container>
  )

}