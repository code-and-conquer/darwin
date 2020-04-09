import React, { FC } from 'react';
import { Position } from '@darwin/types';
import Circle from '../pixi/Circle';
import { FIELD_SIZE } from '../../constants/stage';
import Square from '../pixi/Square';

type Props = {
  color: number;
  position: Position;
};

const HALF_FIELD_SIZE = FIELD_SIZE / 2;

const squareScale = 0.4;
const squareSize = FIELD_SIZE * squareScale;
const squareMargin = (FIELD_SIZE - squareSize) / 2;

const radius = HALF_FIELD_SIZE * 0.3;

const PowerUp: FC<Props> = ({ color, position }) => {
  return (
    <>
      <Square
        position={{
          x: position.x + squareMargin,
          y: position.y + squareMargin,
        }}
        size={squareSize}
        fill={color}
        color={color}
      />
      <Circle
        position={{
          x: position.x + HALF_FIELD_SIZE,
          y: position.y + HALF_FIELD_SIZE,
        }}
        radius={radius}
        color={color}
        fill={0x000000}
        alpha={0.3}
      />
    </>
  );
};

export default PowerUp;
