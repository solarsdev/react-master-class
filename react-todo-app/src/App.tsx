import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import ToDoList from './components/ToDoList';

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
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
