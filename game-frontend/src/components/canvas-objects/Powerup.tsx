import React, { FC } from 'react';
import { Consumable as ConsumableT, PowerupType } from '@darwin/types';
import Circle from '../pixi/Circle';
import { FIELD_SIZE } from '../../constants/stage';
import Square from '../pixi/Square';

type Props = {
  consumable: ConsumableT;
};

const HALF_FIELD_SIZE = FIELD_SIZE / 2;

const squareScale = 0.4;
const squareSize = FIELD_SIZE * squareScale;
const squareMargin = (FIELD_SIZE - squareSize) / 2;

const radius = HALF_FIELD_SIZE * 0.3;

// Color inspiration: https://coolors.co/337fe6-f46547-05bf96-fcb136-a07be6
const COLOR_MAP: Record<PowerupType, number> = {
  enduranceBoost: 0x05bf96,
};

const PowerUp: FC<Props> = ({ consumable }) => (
  <>
    <Square
      position={{
        x: consumable.position.x + squareMargin,
        y: consumable.position.y + squareMargin,
      }}
      size={squareSize}
      fill={COLOR_MAP[consumable.type as PowerupType]}
      color={COLOR_MAP[consumable.type as PowerupType]}
    />
    <Circle
      position={{
        x: consumable.position.x + HALF_FIELD_SIZE,
        y: consumable.position.y + HALF_FIELD_SIZE,
      }}
      radius={radius}
      color={COLOR_MAP[consumable.type as PowerupType]}
      fill={0x000000}
      alpha={0.3}
    />
  </>
);

export default PowerUp;
