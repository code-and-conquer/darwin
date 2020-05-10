import React, { FC } from 'react';
import { Position } from '@darwin/types';
import Circle from '../pixi/Circle';
import { FIELD_SIZE } from '../../constants/stage';
import Square from '../pixi/Square';

type Props = {
  position: Position;
};

const HALF_FIELD_SIZE = FIELD_SIZE / 2;

const squareScale = 0.9;
const squareSize = FIELD_SIZE * squareScale;
const squareMargin = (FIELD_SIZE - squareSize) / 2;

const radius = HALF_FIELD_SIZE * 0.5;

const Wall: FC<Props> = ({ position }) => {
  return (
    <>
      <Square
        position={{
          x: position.x + squareMargin,
          y: position.y + squareMargin,
        }}
        size={squareSize}
        fill={0xdedede}
        color={0xdedede}
      />
      <Circle
        position={{
          x: position.x + HALF_FIELD_SIZE,
          y: position.y + HALF_FIELD_SIZE,
        }}
        radius={radius}
        lineWidth={0}
        fill={0x373f44}
        alpha={0.3}
      />
    </>
  );
};

export default Wall;
