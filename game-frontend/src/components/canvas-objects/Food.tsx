import React from 'react';
import Circle from '../pixi/Circle';
import Position from '../../../../darwin-types/Position';

type Props = {
  position: Position;
};

function Unit({ position }: Props): JSX.Element {
  return <Circle position={position} radius={2} color={0xff700b} />;
}

export default Unit;
