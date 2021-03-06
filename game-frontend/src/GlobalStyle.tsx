import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
 html, body, #root {
   margin: 0;
   padding: 0;
   font-family: sans-serif;
   height: 100%;
   font-family: Roboto;
   line-height: 1.5;
 }

  h1, h2, h3, h4, h5, h6 {
    &:first-child {
      margin-top: 0;
    }
  }

  * {
    box-sizing: border-box;
  }

  .monaco-aria-container {
    bottom: 0;
  }
`;

export default GlobalStyle;
