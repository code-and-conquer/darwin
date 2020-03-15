import React, { useState } from 'react';

import styled from 'styled-components';
import logo from './logo.svg';
import Game from './Game';
import { WebsocketProvider } from './service/useWebsocketData';
import AppContainer from './components/container/AppContainer';
import AppHeader from './components/visual/AppHeader';
import AppTitle from './components/visual/AppTitle';
import AppLogo from './components/visual/AppLogo';
import GlobalStyle from './GlobalStyle';
import UserScript from './components/user-script';

import HelpDialog from './components/HelpDialog';

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

function App(): JSX.Element {
  const [isHelpDialogOpen, setIsHelpDialogOpen] = useState(false);
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <AppHeader>
          {isHelpDialogOpen && <HelpDialog />}
          <Button onClick={() => setIsHelpDialogOpen(!isHelpDialogOpen)}>
            {' '}
            Help dialog
          </Button>
          <AppLogo src={logo} className="App-logo" alt="logo" />
          <AppTitle>Darwin is ready for React.</AppTitle>
        </AppHeader>
        <WebsocketProvider>
          <UserScript />
          <Game />
        </WebsocketProvider>
      </AppContainer>
    </>
  );
}

export default App;
