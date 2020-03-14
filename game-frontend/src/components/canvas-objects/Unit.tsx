import React from 'react';
import Square from '../pixi/Square';
import Position from '../../../../darwin-types/Position';

type Props = {
  position: Position;
};

function Unit({ position }: Props): JSX.Element {
  return <Square position={position} size={10} color={0xffd900} />;
}

export default Unit;
