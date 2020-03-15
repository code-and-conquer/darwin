import React, { FC } from 'react';
import Circle from '../pixi/Circle';
import Position from '../../../../darwin-types/Position';
import { FIELD_SIZE } from '../../constants/stage';

type Props = {
  position: Position;
};

const Unit: FC<Props> = ({ position }) => (
  <Circle position={position} radius={FIELD_SIZE / 2} color={0xff700b} />
);

export default Unit;
