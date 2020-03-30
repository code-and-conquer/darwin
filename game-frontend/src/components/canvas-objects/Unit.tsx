import React, { FC } from 'react';
import Square from '../pixi/Square';
import Triangle from '../pixi/Triangle';
import Position from '../../../../darwin-types/Position';
import { FIELD_SIZE } from '../../constants/stage';
import Parallelogram from '../pixi/Parallelogram';
import HealthBar from './HealthBar';

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

const Unit: FC<Props> = ({ position, isOwn, health }) => {
  const color = isOwn ? 0x2ec655 : 0xff193b;
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
      <Parallelogram
        alpha={0.2}
        fill={0x000000}
        position={{
          x: position.x + squareMargin,
          y: position.y + squareMargin,
        }}
        size={squareSize}
      />
      <Triangle
        position={{
          x: position.x + FIELD_SIZE / 2,
          y: position.y + triangleMargin,
        }}
        size={triangleSize}
        color={color}
        fill={color}
      />
      <HealthBar position={position} health={health} />
    </>
  );
};

export default Unit;
