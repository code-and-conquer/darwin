import React from 'react';
import { Stage } from '@inlet/react-pixi';
import Position from '../../darwin-types/Position';
import CanvasWrapper from './components/visual/canvas-wrapper';
import useWebsocketData from './service/useWebsocketData';
import Unit from './components/canvas-objects/Unit';
import { State } from '../../darwin-types/State';
import Field from './components/canvas-objects/Field';

interface Unit {
  position: Position;
}

function Game(): JSX.Element {
  const STAGE_ROWS = 20;
  const STAGE_COLUMNS = 20;
  const gameState: State = useWebsocketData();

  const fields: Position[] = [];

  for (let row = 0; row < STAGE_ROWS; row++) {
    for (let col = 0; col < STAGE_COLUMNS; col++) {
      fields.push({
        x: row,
        y: col,
      } as Position);
    }
  }

  if (!gameState) {
    return <p>Loading</p>;
  }

  return (
    <CanvasWrapper>
      <Stage width={STAGE_ROWS} height={STAGE_COLUMNS}>
        {fields.map(field => (
          <Field position={field} />
        ))}
        {gameState.objectIds.map(objectId => (
          <Unit {...gameState.objectMap[objectId]} key={objectId} />
        ))}
      </Stage>
    </CanvasWrapper>
  );
}

export default Game;
