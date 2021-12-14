import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import ToDoList from './ToDoList';

const GlobalStyle = createGlobalStyle`
  ${reset}
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <ToDoList />
    </>
  );
};

export default App;
