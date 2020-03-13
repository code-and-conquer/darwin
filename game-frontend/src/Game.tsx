import React from 'react';
import { Stage } from '@inlet/react-pixi';
import Position from '../../darwin-types/Position';
import CanvasWrapper from './components/visual/canvas-wrapper';
import useWebsocketData from './service/useWebsocketData';
import Unit from './components/canvas-objects/Unit';
import { State } from '../../darwin-types/State';

interface Unit {
  position: Position;
}

function Game(): JSX.Element {
  const gameState: State = useWebsocketData();

  if (!gameState) {
    return <p>Loading</p>;
  }

  return (
    <CanvasWrapper>
      <Stage width={200} height={200}>
        {gameState.objectIds.map(objectId => (
          <Unit {...gameState.objectMap[objectId]} key={objectId} />
        ))}
      </Stage>
    </CanvasWrapper>
  );
}

export default Game;
