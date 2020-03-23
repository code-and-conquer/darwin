import React from 'react';
import { Stage } from '@inlet/react-pixi';
import CanvasWrapper from './components/visual/CanvasWrapper';
import { useGameState, useUserContext } from './service/game';
import GameObjects from './components/canvas-objects/GameObjects';
import Grid from './components/canvas-objects/Grid';
import { FIELD_SIZE, STAGE_COLUMNS, STAGE_ROWS } from './constants/stage';

function Game(): JSX.Element {
  const gameState = useGameState();
  const userContext = useUserContext();

  if (!gameState) {
    return <p>Loading</p>;
  }

  return (
    <CanvasWrapper>
      <Stage
        options={{
          backgroundColor: 0x001437,
          resolution: window.devicePixelRatio,
        }}
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
          ownUnitId={userContext.unitId}
          scaleFactor={FIELD_SIZE}
        />
      </Stage>
    </CanvasWrapper>
  );
}

export default Game;
