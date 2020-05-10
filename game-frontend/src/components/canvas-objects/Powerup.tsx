import React, { FC } from 'react';
import { Position } from '@darwin/types';
import { Sprite } from '@inlet/react-pixi';
import { FIELD_SIZE } from '../../constants/stage';
import endurance from '../../assets/images/endurance.png';
import teleport from '../../assets/images/teleport.png';
import healthregen from '../../assets/images/healthregen.png';

type Props = {
  position: Position;
};

const HealthRegen: FC<Props> = ({ position }) => {
  return (
    <>
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
