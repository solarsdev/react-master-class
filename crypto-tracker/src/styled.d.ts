// import package to extend
import 'styled-components';

// extending
declare module 'styled-components' {
  export interface DefaultTheme {
    themeName?: 'light' | 'dark';
    textColor: string;
    bgColor: string;
    accentColor: string;
    plusColor: string;
    minusColor: string;
    overviewColor: string;
    h1Size: string;
    h2Size: string;
    h3Size: string;
    textSize: string;
  }
}
