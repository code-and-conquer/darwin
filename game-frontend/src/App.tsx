import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import logo from './logo.svg';
import Game from './Game';
import useWebsocketData from './useWebsocketData';

const GlobalStyle = createGlobalStyle`
 body {
   margin: 0;
   padding: 0;
   font-family: sans-serif;
 }
`;

const AppContainer = styled.div`
  text-align: center;
`;

const AppHeader = styled.header`
  background-color: #222;
  height: 150px;
  padding: 20px;
  color: white;
`;

const AppTitle = styled.h1`
  font-size: 1.5em;
`;

const AppLogo = styled.img`
  animation: App-logo-spin infinite 20s linear;
  height: 80px;
  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

function App() {
  const unit = useWebsocketData();
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <AppHeader>
          <AppLogo src={logo} className="App-logo" alt="logo" />
          <AppTitle>Darwin is ready for React.</AppTitle>
        </AppHeader>
        {unit && <Game unit={unit} />}
      </AppContainer>
    </>
  );
}

export default App;
