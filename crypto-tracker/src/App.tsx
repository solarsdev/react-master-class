import Router from './Router';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './theme';
import { useRecoilValue } from 'recoil';
import { themeNameAtom } from './atoms';

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
  const themeName = useRecoilValue(themeNameAtom);
  return (
    <ThemeProvider theme={themeName === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Router />
      <ReactQueryDevtools initialIsOpen={false} />
    </ThemeProvider>
  );
}

export default App;
