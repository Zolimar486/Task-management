import styled from "styled-components";

const Container = styled.div`
display:flex;
justify-content:end;
margin:
`

const List = styled.ul`
list-style:none;
display:flex;
align-items:center;
justify-content:center;
`


const LitsItems= styled.li`
margin:0px 6px;

`

const Button = styled.button`
border:none;
background-color:#8A5CF3;
color:white;
width:25px;
height:25px;
cursor:pointer;


&:hover {
  background-color:#C7B3F6;
}
`

const Pagination = ({ tasksPerPage, totalTasks, paginate }) => {
  const pageNumbers = [];

  // Calculate the total number of pages
  for (let i = 1; i <= Math.ceil(totalTasks / tasksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
   
   <Container>
     <List>
      
      {pageNumbers.map((pageNumber) => (
        <LitsItems key={pageNumber}>
          <Button onClick={() => paginate(pageNumber)}>{pageNumber}</Button>
        </LitsItems>
      ))}
    </List>
   </Container>
   


  );
};

export default Pagination
