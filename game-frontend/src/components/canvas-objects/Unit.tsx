import React from 'react';
import Square from '../pixi/Square';
import Position from '../../../../darwin-types/Position';
import { FIELD_SIZE } from '../../constants/stage';

type Props = {
  position: Position;
};

function Unit({ position }: Props): JSX.Element {
  return <Square position={position} size={FIELD_SIZE} color={0xffd900} />;
}

export default Unit;
