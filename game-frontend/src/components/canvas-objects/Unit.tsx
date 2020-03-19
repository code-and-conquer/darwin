import React, { FC } from 'react';
import Square from '../pixi/Square';
import Position from '../../../../darwin-types/Position';
import { FIELD_SIZE } from '../../constants/stage';

type Props = {
  position: Position;
  health: number;
  isOwn: boolean;
};

const scale = 0.8;
const size = FIELD_SIZE * scale;
const margin = (FIELD_SIZE - size) / 2;

const Unit: FC<Props> = ({ position }) => (
  <>
    <Square
      position={{ x: position.x + margin, y: position.y + margin }}
      size={size}
      color={0x7898fb}
      fill={0x7898fb}
    />
  </>
);

export default Unit;
