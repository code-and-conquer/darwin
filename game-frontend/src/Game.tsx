import React from 'react';
import { Stage } from '@inlet/react-pixi';
import CanvasWrapper from './components/visual/canvas-wrapper';
import useWebsocketData from './service/useWebsocketData';
import GameObjects from './components/canvas-objects/GameObjects';
import { State } from '../../darwin-types/State';
import Grid from './components/canvas-objects/Grid';

function Game(): JSX.Element {
  const STAGE_ROWS = 20;
  const STAGE_COLUMNS = 20;
  const SCALE_FACTOR = 10;

  const gameState: State = useWebsocketData();

  if (!gameState) {
    return <p>Loading</p>;
  }

  return (
    <CanvasWrapper>
      <Stage width={STAGE_ROWS * SCALE_FACTOR} height={STAGE_COLUMNS * SCALE_FACTOR}>
        <Grid
          numberOfRows={STAGE_ROWS}
          numberOfColumns={STAGE_COLUMNS}
          scaleFactor={SCALE_FACTOR}
        />
        <GameObjects
          objectIds={gameState.objectIds}
          objectMap={gameState.objectMap}
          scaleFactor={SCALE_FACTOR}
        />
      </Stage>
    </CanvasWrapper>
  );
}

export default Game;
