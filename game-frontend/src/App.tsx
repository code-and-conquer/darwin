import React from 'react';
import Game from './Game';
import { WebsocketProvider } from './service/game';
import AppContainer from './components/container/AppContainer';
import ContentContainer from './components/container/ContentContainer';
import GlobalStyle from './GlobalStyle';
import UserScript from './components/user-script';
import Help from './components/help';
import UnitProperties from './UnitProperties';

function App(): JSX.Element {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Help />
        <WebsocketProvider>
          <ContentContainer>
            <UnitProperties />
            <Game />
          </ContentContainer>
          <UserScript />
        </WebsocketProvider>
      </AppContainer>
    </>
  );
}

export default App;
