import React, { FC } from 'react';
import Square from '../pixi/Square';
import Triangle from '../pixi/Triangle';
import Position from '../../../../darwin-types/Position';
import { FIELD_SIZE } from '../../constants/stage';

type Props = {
  position: Position;
  health: number;
  isOwn: boolean;
};

const squareScale = 0.8;
const squareSize = FIELD_SIZE * squareScale;
const squareMargin = (FIELD_SIZE - squareSize) / 2;

const triangleScale = 0.4;
const triangleSize = FIELD_SIZE * triangleScale;
const triangleMargin = (FIELD_SIZE - triangleSize) / 2;

const Unit: FC<Props> = ({ position, isOwn }) => {
  const color = isOwn ? 0x7898fb : 0xffd900;
  return (
    <>
      <Square
        position={{
          x: position.x + squareMargin,
          y: position.y + squareMargin,
        }}
        size={squareSize}
        color={color}
        fill={color}
      />
      <Triangle
        position={{
          x: position.x + FIELD_SIZE / 2,
          y: position.y + triangleMargin,
        }}
        size={triangleSize}
        color={0xff2079}
        fill={0xff2079}
      />
    </>
  );
};

export default Unit;
