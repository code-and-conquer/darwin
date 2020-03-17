import React, { useState } from 'react';
import logo from './logo.svg';
import Game from './Game';
import { WebsocketProvider } from './service/useWebsocketData';
import AppContainer from './components/container/AppContainer';
import AppHeader from './components/visual/AppHeader';
import AppTitle from './components/visual/AppTitle';
import AppLogo from './components/visual/AppLogo';
import Button from './components/visual/Button';
import GlobalStyle from './GlobalStyle';
import UserScript from './components/user-script';
import HelpDialog from './components/HelpDialog';

function App(): JSX.Element {
  const [isHelpDialogOpen, setIsHelpDialogOpen] = useState(false);
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <AppHeader>
          {isHelpDialogOpen && <HelpDialog />}
          <Button onClick={() => setIsHelpDialogOpen(!isHelpDialogOpen)}>
            Toggle Help
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
