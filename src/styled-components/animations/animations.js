import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  display: flex;
`;

const animation = keyframes`
  0% {
    transform: rotate(0deg);
    border-radius: 0px;
  }
  50% {
    border-radius: 100px;
  }
  100% {
    transform: rotate(360deg);
    border-radius: 0px;
  }
`;

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  animation: ${animation} 3s linear infinite;
`;

function App() {
  return (
    <Container>
      <Box />
    </Container>
  );
}

export default App;
