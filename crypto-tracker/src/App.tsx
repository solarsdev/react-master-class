import Router from './Router';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Source+Sans+Pro:wght@300;400&display=swap');
  ${reset}
  * {
		box-sizing: border-box;
	}
	body {
		font-family: 'Source Sans Pro', sans-serif;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
    font-size: ${(props) => props.theme.textSize};
	}
	a {
		text-decoration: none;
    color: inherit;
	}
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
