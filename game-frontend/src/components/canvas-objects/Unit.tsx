import React, { FC } from 'react';
import Square from '../pixi/Square';
import Position from '../../../../darwin-types/Position';
import { FIELD_SIZE } from '../../constants/stage';

type Props = {
  position: Position;
  health: number;
  isOwn: boolean;
};

const Unit: FC<Props> = ({ position, isOwn }) => (
  <Square
    position={position}
    size={FIELD_SIZE}
    color={isOwn ? 0x70f8ba : 0xffd900}
    lineWidth={isOwn ? 2 : 1}
  />
);

export default Unit;
