import React from 'react';

import Game from './Game';
import { WebsocketProvider } from './service/game';
import AppContainer from './components/container/AppContainer';
import SideContainer from './components/container/SideContainer';
import ContentContainer from './components/container/ContentContainer';
import GlobalStyle from './GlobalStyle';
import UserScript from './components/user-script';
import Help from './components/help';

function App(): JSX.Element {
  return (
    <>
      <GlobalStyle />
      <WebsocketProvider>
        <AppContainer>
          <SideContainer>
            <UserScript />
          </SideContainer>
          <ContentContainer>
            <Game />
            <Help />
          </ContentContainer>
        </AppContainer>
      </WebsocketProvider>
    </>
  );
}

export default App;
