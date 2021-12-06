import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;

const BoxOne = styled.div`
  background-color: teal;
  width: 100px;
  height: 100px;
`;

const BoxTwo = styled.div`
  background-color: tomato;
  width: 100px;
  height: 100px;
`;

const Text = styled.span`
  color: white;
`;

function App() {
  return (
    <Container>
      <BoxOne>
        <Text>Hello, World</Text>
      </BoxOne>
      <BoxTwo />
    </Container>
  );
}

export default App;
