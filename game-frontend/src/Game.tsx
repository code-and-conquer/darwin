import React from 'react';
import { Stage } from '@inlet/react-pixi';
import Position from '../../darwin-types/Position';
import CanvasWrapper from './components/visual/canvas-wrapper';
import useWebsocketData from './service/useWebsocketData';
import Unit from './components/canvas-objects/Unit';

interface Unit {
  position: Position;
}

function Game(): JSX.Element {
  const unit: Unit | null = useWebsocketData();

  if (!unit) {
    return <p>Loading</p>;
  }

  const { x, y } = (unit as Unit).position;

  return (
    <CanvasWrapper>
      <Stage width={200} height={200}>
        <Unit position={{ x: x * 10, y: y * 10 }} />
      </Stage>
    </CanvasWrapper>
  );
}

export default Game;
