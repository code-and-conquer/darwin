import React from 'react';

import Game from './Game';
import { WebsocketProvider } from './service/useWebsocketData';
import AppContainer from './components/container/AppContainer';
import ContentContainer from './components/container/ContentContainer';
import GlobalStyle from './GlobalStyle';
import UserScript from './components/user-script';
import Help from './components/help';

import '@reach/dialog/styles.css';

function App(): JSX.Element {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Help />
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
