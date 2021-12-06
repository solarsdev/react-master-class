import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;

const Input = styled.input`
  background-color: tomato;
`;

function App() {
  return (
    <Container>
      <Input required='true' />
      <Input required='true' />
      <Input required='true' />
      <Input required='true' />
      <Input required='true' />
    </Container>
  );
}

export default App;
