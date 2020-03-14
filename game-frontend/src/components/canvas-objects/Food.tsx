import React from 'react';
import Circle from '../pixi/Circle';
import Position from '../../../../darwin-types/Position';
import { FIELD_SIZE } from '../../constants/stage';

type Props = {
  position: Position;
};

function Unit({ position }: Props): JSX.Element {
  return (
    <Circle position={position} radius={FIELD_SIZE / 2} color={0xff700b} />
  );
}

export default Unit;
