import React, { FC } from 'react';
import { Position } from '@darwin/types';
import { Sprite } from '@inlet/react-pixi';
import { FIELD_SIZE } from '../../constants/stage';
import endurance from '../../assets/images/endurance.png';
import teleport from '../../assets/images/teleport.png';
import healthregen from '../../assets/images/healthregen.png';
import Circle from '../pixi/Circle';

type Props = {
  position: Position;
};

const HALF_FIELD_SIZE = FIELD_SIZE / 2;
const radius = HALF_FIELD_SIZE;

const HealthRegen: FC<Props> = ({ position }) => {
  return (
    <>
      <Circle
        position={{
          x: position.x + HALF_FIELD_SIZE,
          y: position.y + HALF_FIELD_SIZE,
        }}
        radius={radius}
        color={0xd7ff9e}
        fill={0xd7ff9e}
      />
      <Sprite
        height={FIELD_SIZE}
        width={FIELD_SIZE}
        image={healthregen}
        x={position.x}
        y={position.y}
      />
    </>
  );
};

const Endurance: FC<Props> = ({ position }) => {
  return (
    <>
      <Circle
        position={{
          x: position.x + HALF_FIELD_SIZE,
          y: position.y + HALF_FIELD_SIZE,
        }}
        radius={radius}
        color={0x05bf96}
        fill={0x05bf96}
      />
      <Sprite
        height={FIELD_SIZE}
        width={FIELD_SIZE}
        image={endurance}
        x={position.x}
        y={position.y}
      />
    </>
  );
};

const Teleport: FC<Props> = ({ position }) => {
  return (
    <>
      <Circle
        position={{
          x: position.x + HALF_FIELD_SIZE,
          y: position.y + HALF_FIELD_SIZE,
        }}
        radius={radius}
        color={0xffc0cb}
        fill={0xffc0cb}
      />
      <Sprite
        height={FIELD_SIZE}
        width={FIELD_SIZE}
        image={teleport}
        x={position.x}
        y={position.y}
      />
    </>
  );
};

export { Teleport, Endurance, HealthRegen };
