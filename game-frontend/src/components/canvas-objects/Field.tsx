import React from 'react';
import Square from '../pixi/Square';
import Position from '../../../../darwin-types/Position';
import { FIELD_SIZE } from '../../constants/stage';

type Props = {
  position: Position;
  scaleFactor: number;
};

function Field({ position }: Props): JSX.Element {
  return <Square position={position} size={FIELD_SIZE} color={0x333333} />;
}

export default Field;
