import React from 'react';

import logo from './logo.svg';
import Game from './Game';
import useWebsocketData from './useWebsocketData';
import AppContainer from './components/container/app-container';
import AppHeader from './components/visual/app-header';
import AppTitle from './components/visual/app-title';
import AppLogo from './components/visual/app-logo';
import GlobalStyle from './global-style';

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
