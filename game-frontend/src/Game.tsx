import React from 'react';
import { Stage, Text } from '@inlet/react-pixi';
import * as Pixi from 'pixi.js';
import Position from '../../darwin-types/Position';
import CanvasWrapper from './components/visual/canvas-wrapper';
import useWebsocketData from './service/useWebsocketData';

interface Unit {
  position: Position;
}

function Game() {
  const unit: Unit | null = useWebsocketData();

  if (!unit) {
    return <p>Loading</p>;
  }
  return (
    <CanvasWrapper>
      <Stage width={200} height={200}>
        <Text
          text=":)"
          anchor={0.5}
          x={(unit as Unit).position.x * 10}
          y={(unit as Unit).position.y * 10}
          style={
            new Pixi.TextStyle({
              align: 'center',
              fontSize: 50,
              fill: '#ffffff',
            })
          }
        />
      </Stage>
    </CanvasWrapper>
  );
}

export default Game;
