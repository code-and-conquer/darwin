import React from 'react';
import { Stage } from '@inlet/react-pixi';
import CanvasWrapper from './components/visual/canvas-wrapper';
import useWebsocketData from './service/useWebsocketData';
import GameObjects from './components/canvas-objects/GameObjects';
import { State } from '../../darwin-types/State';

function Game(): JSX.Element {
  const gameState: State = useWebsocketData();

  if (!gameState) {
    return <p>Loading</p>;
  }

  return (
    <CanvasWrapper>
      <Stage width={200} height={200}>
        <GameObjects
          objectIds={gameState.objectIds}
          objectMap={gameState.objectMap}
          scaleFactor={10}
        />
      </Stage>
    </CanvasWrapper>
  );
}

export default Game;
