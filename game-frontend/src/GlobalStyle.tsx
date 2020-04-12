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

 * {
   box-sizing: border-box;
 }
`;

export default GlobalStyle;
