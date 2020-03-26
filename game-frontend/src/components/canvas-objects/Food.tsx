import React, { FC } from 'react';
import Circle from '../pixi/Circle';
import Position from '../../../../darwin-types/Position';
import { FIELD_SIZE } from '../../constants/stage';

type Props = {
  position: Position;
};

const HALF_FIELD_SIZE = FIELD_SIZE / 2;
const radius = HALF_FIELD_SIZE / 2;

const Food: FC<Props> = ({ position }) => (
  <>
    <Circle
      position={{
        x: position.x + HALF_FIELD_SIZE,
        y: position.y + HALF_FIELD_SIZE,
      }}
      radius={radius}
      color={0xb8fb3c}
      fill={0xb8fb3c}
    />
    <Circle
      position={{
        x: position.x + HALF_FIELD_SIZE,
        y: position.y + HALF_FIELD_SIZE,
      }}
      radius={radius - 2}
      lineWidth={0}
      fill={0x000000}
      alpha={0.2}
    />
  </>
);

export default Food;
