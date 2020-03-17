import React from 'react';

import Game from './Game';
import { WebsocketProvider } from './service/useWebsocketData';
import AppContainer from './components/container/AppContainer';
import ContentContainer from './components/container/ContentContainer';
import GlobalStyle from './GlobalStyle';
import UserScript from './components/user-script';

function App(): JSX.Element {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <WebsocketProvider>
          <ContentContainer>
            <Game />
          </ContentContainer>
          <UserScript />
        </WebsocketProvider>
      </AppContainer>
    </>
  );
}

export default App;
