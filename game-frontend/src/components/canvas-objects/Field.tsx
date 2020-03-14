import React from 'react';
import Square from '../pixi/Square';
import Position from '../../../../darwin-types/Position';

type Props = {
  position: Position;
};

function Field({ position }: Props): JSX.Element {
  return <Square position={position} size={10} color={0x333333} />;
}

export default Field;
