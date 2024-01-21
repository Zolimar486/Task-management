import styled from 'styled-components'
import { spacing } from '../utilities/spacing'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPenToSquare,faArrowRight } from '@fortawesome/free-solid-svg-icons'

const Container = styled.div``


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



export default function Filters({item}){
  return(
    
    <Container > 
    <Wrapper key={item._id}>
          <Space>
          <H3>{item.title} </H3>
          <ButtonContainer>
            <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#83FFBD", cursor: "pointer", fontSize:"18px" }} />
            <FontAwesomeIcon icon={faTrashCan} style={{ color: "#FF6262", cursor: "pointer" }} />
            <SelectStatus>
            <OptionStatus >Status</OptionStatus>
            <OptionStatus>Pending</OptionStatus>
            <OptionStatus>In Progress</OptionStatus>
            <OptionStatus>Completed</OptionStatus>
          </SelectStatus>
          
          </ButtonContainer>
          </Space>
         
          <Content>
          <Desc>{item.description} </Desc>
          <Date>Due Date: {item.dueDate} </Date>
          <Status>Priority {item.priority} </Status>        
          <Status>Status : {item.Status} </Status>

          </Content>

        </Wrapper>

    </Container>
  )
}