import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import logo from './logo.svg';
import Game from './Game';
import useWebsocketData from './useWebsocketData';
import HelpDialog from './components/HelpDialog';

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

const Button = styled.button`

  background-color: rebeccapurple; 
  border: none;
  border-radius: 200px;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
`;

function App() {
  const unit = useWebsocketData();
  const [isHelpDialogOpen, setIsHelpDialogOpen] = useState(false);
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <AppHeader>
          {
            isHelpDialogOpen && <HelpDialog />
          }
          <Button onClick={() => setIsHelpDialogOpen(!isHelpDialogOpen)}> Help dialog</Button>
          <AppLogo src={logo} className="App-logo" alt="logo" />
          <AppTitle>Darwin is ready for React.</AppTitle>
          {unit && <Game unit={unit} />}
        </AppHeader>
      </AppContainer>
    </>
  );
}

export default App;
