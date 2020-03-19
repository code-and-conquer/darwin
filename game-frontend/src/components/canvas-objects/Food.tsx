import React, { FC } from 'react';
import Circle from '../pixi/Circle';
import Position from '../../../../darwin-types/Position';
import { FIELD_SIZE } from '../../constants/stage';

type Props = {
  position: Position;
};

const HALF_FIELD_SIZE = FIELD_SIZE / 2;

const Food: FC<Props> = ({ position }) => (
  <Circle
    position={{
      x: position.x + HALF_FIELD_SIZE,
      y: position.y + HALF_FIELD_SIZE,
    }}
    radius={HALF_FIELD_SIZE}
    color={0xff700b}
  />
);

export default Food;
