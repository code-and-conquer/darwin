import React, { FC } from 'react';
import { Position } from '@darwin/types';
import Square from '../pixi/Square';
import { FIELD_SIZE } from '../../constants/stage';

type Props = {
  position: Position;
  scaleFactor: number;
};

const Field: FC<Props> = ({ position }) => (
  <Square position={position} size={FIELD_SIZE} color={0x333333} />
);

export default Field;
