import React from 'react'
import {Stage, Text} from '@inlet/react-pixi';
import * as Pixi from 'pixi.js';

interface GameProps {
  unit: any
}

function Game({unit}: GameProps) {
  return <Stage width={200} height={200}>
    <Text
        text=":)"
        anchor={0.5}
        x={unit.position.x * 10}
        y={unit.position.y * 10}
        style={
          new Pixi.TextStyle({
            align: 'center',
            fontSize: 50,
            fill: '#ffffff',
          })
        }
    />
  </Stage>
}

export default Game
