import React, { FC } from 'react';
import { Position } from '@darwin/types';
import Circle from '../pixi/Circle';
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
      color={0x5aa1ff}
      fill={0x5aa1ff}
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
