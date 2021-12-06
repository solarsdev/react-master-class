import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;

const Btn = styled.button`
  color: white;
  background-color: tomato;
  border: 0;
  border-radius: 15px;
`;

function App() {
  return (
    <Container as='header'>
      <Btn>Login</Btn>
      <Btn as='a' href='/'>
        Login
      </Btn>
    </Container>
  );
}

export default App;
