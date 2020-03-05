import React from 'react';

import logo from './logo.svg';
import Game from './game';
import { WebsocketProvider } from './service/useWebsocketData';
import AppContainer from './components/container/app-container';
import AppHeader from './components/visual/app-header';
import AppTitle from './components/visual/app-title';
import AppLogo from './components/visual/app-logo';
import GlobalStyle from './global-style';

function App() {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <AppHeader>
          <AppLogo src={logo} className="App-logo" alt="logo" />
          <AppTitle>Darwin is ready for React.</AppTitle>
        </AppHeader>
        <WebsocketProvider>
          <Game />
        </WebsocketProvider>
      </AppContainer>
    </>
  );
}

export default App;
