import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;

const Input = styled.input.attrs({ required: true, minLength: 10 })`
  background-color: tomato;
`;

function App() {
  return (
    <Container>
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
    </Container>
  );
}

export default App;
