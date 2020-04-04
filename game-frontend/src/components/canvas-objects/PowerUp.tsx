import React, { FC } from 'react';
import { Position, ATTRIBUTES } from '@darwin/types';
import Circle from '../pixi/Circle';
import { FIELD_SIZE } from '../../constants/stage';
import Square from '../pixi/Square';

type Props = {
  position: Position;
  subType: string;
};

const HALF_FIELD_SIZE = FIELD_SIZE / 2;

const squareScale = 0.4;
const squareSize = FIELD_SIZE * squareScale;
const squareMargin = (FIELD_SIZE - squareSize) / 2;

const radius = HALF_FIELD_SIZE * 0.3;

// Color inspiration: https://coolors.co/337fe6-f46547-05bf96-fcb136-a07be6
const COLOR_MAP: { [key: string]: number } = {
  [ATTRIBUTES.ENDURANCE_BOOST]: 0x05bf96,
};

const PowerUp: FC<Props> = ({ position, subType }) => (
  <>
    <Square
      position={{
        x: position.x + squareMargin,
        y: position.y + squareMargin,
      }}
      size={squareSize}
      fill={COLOR_MAP[subType]}
      color={COLOR_MAP[subType]}
    />
    <Circle
      position={{
        x: position.x + HALF_FIELD_SIZE,
        y: position.y + HALF_FIELD_SIZE,
      }}
      radius={radius}
      color={COLOR_MAP[subType]}
      fill={0x000000}
      alpha={0.3}
    />
  </>
);

export default PowerUp;
