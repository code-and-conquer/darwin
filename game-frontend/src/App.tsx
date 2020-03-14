import React from 'react';

import logo from './logo.svg';
import Game from './Game';
import { WebsocketProvider } from './service/useWebsocketData';
import AppContainer from './components/container/AppContainer';
import AppHeader from './components/visual/AppHeader';
import AppTitle from './components/visual/AppTitle';
import AppLogo from './components/visual/AppLogo';
import GlobalStyle from './GlobalStyle';
import UserScript from './components/user-script';

function App(): JSX.Element {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <AppHeader>
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
