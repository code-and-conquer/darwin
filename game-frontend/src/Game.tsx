import React, { useEffect, useState } from 'react';
import { Container, Stage } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import { GameObjectTypes } from '@darwin/types';
import CanvasWrapper from './components/visual/CanvasWrapper';
import { useGameState, useUserContext } from './service/game';
import GameObjects from './components/canvas-objects/GameObjects';
import Grid from './components/canvas-objects/Grid';
import { FIELD_SIZE, STAGE_COLUMNS, STAGE_ROWS } from './constants/stage';
import Rectangle from './components/pixi/Rectangle';
import Firework from './components/pixi/Firework';

const width = STAGE_COLUMNS * FIELD_SIZE;
const height = STAGE_ROWS * FIELD_SIZE;

function Game(): JSX.Element {
  const [hasJoinedGame, setHasJoinedGame] = useState(false);
  const gameState = useGameState();
  const userContext = useUserContext();

  const isLiving = !!gameState.objectMap[userContext.unitId];

  useEffect(() => {
    if (isLiving) {
      setHasJoinedGame(true);
    }
  }, [isLiving]);

  const isDead = hasJoinedGame && !isLiving;

  const isOnlyOnePlayerLeft =
    gameState.objectIds
      .map(id => gameState.objectMap[id])
      .filter(gameObject => gameObject.type === GameObjectTypes.Unit).length ===
    1;

  const hasWon = isLiving && isOnlyOnePlayerLeft;

  if (!hasJoinedGame) {
    return <p>Warten...</p>;
  }

  const colorMatrix = new PIXI.filters.ColorMatrixFilter();
  if (isDead) {
    colorMatrix.sepia(true);
  }

  return (
    <>
      <CanvasWrapper>
        <Stage
          options={{
            resolution: window.devicePixelRatio,
          }}
          width={width}
          height={height}
        >
          <Container filters={isDead ? [colorMatrix] : []}>
            {hasWon ? <Firework /> : null}
            <Rectangle
              fill={0x191919}
              width={width}
              height={height}
              position={{ x: 0, y: 0 }}
            />
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
          </Container>
        </Stage>
      </CanvasWrapper>
    </>
  );
}

export default Game;
