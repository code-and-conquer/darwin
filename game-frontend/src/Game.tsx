import React from 'react';
import { Stage } from '@inlet/react-pixi';
import CanvasWrapper from './components/visual/CanvasWrapper';
import useWebsocketData from './service/useWebsocketData';
import GameObjects from './components/canvas-objects/GameObjects';
import { State } from '../../darwin-types/State';
import Grid from './components/canvas-objects/Grid';
import { STAGE_ROWS, FIELD_SIZE, STAGE_COLUMNS } from './constants/stage';

function Game(): JSX.Element {
  const gameState: State = useWebsocketData();

  if (!gameState) {
    return <p>Loading</p>;
  }

  return (
    <CanvasWrapper>
      <Stage
        width={STAGE_ROWS * FIELD_SIZE}
        height={STAGE_COLUMNS * FIELD_SIZE}
      >
        <Grid
          numberOfRows={STAGE_ROWS}
          numberOfColumns={STAGE_COLUMNS}
          scaleFactor={FIELD_SIZE}
        />
        <GameObjects
          objectIds={gameState.objectIds}
          objectMap={gameState.objectMap}
          scaleFactor={FIELD_SIZE}
        />
      </Stage>
    </CanvasWrapper>
  );
}

export default Game;
