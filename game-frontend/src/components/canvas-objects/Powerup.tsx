import React, { FC } from 'react';
import { Position } from '@darwin/types';
import { Sprite } from '@inlet/react-pixi';
import { FIELD_SIZE } from '../../constants/stage';
import healthRegen from '../../assets/images/heart.svg';
import teleport from '../../assets/images/teleport.svg';
import endurance from '../../assets/images/biceps.svg';
import Square from '../pixi/Square';

interface Props extends BaseProps {
  color: number;
  image: string;
  iconScale?: number;
}

type BaseProps = {
  position: Position;
};

const squareScale = 0.6;
const squareSize = FIELD_SIZE * squareScale;
const squareMargin = (FIELD_SIZE - squareSize) / 2;

const Powerup: FC<Props> = ({ position, color, image, iconScale = 1 }) => {
  const iconSize = squareSize * iconScale;
  const iconMargin = (FIELD_SIZE - iconSize) / 2;
  return (
    <>
      <Square
        position={{
          x: position.x + squareMargin,
          y: position.y + squareMargin,
        }}
        size={squareSize}
        fill={color}
        color={color}
      />
      <Sprite
        height={iconSize}
        width={iconSize}
        image={image}
        x={position.x + iconMargin}
        y={position.y + iconMargin}
      />
    </>
  );
};

const HealthRegen: FC<BaseProps> = ({ position }) => (
  <Powerup
    position={position}
    color={0xd7ff9e}
    image={healthRegen}
    iconScale={1.1}
  />
);
const Endurance: FC<BaseProps> = ({ position }) => (
  <Powerup
    position={position}
    color={0x05bf96}
    image={endurance}
    iconScale={0.8}
  />
);

const Teleport: FC<BaseProps> = ({ position }) => (
  <Powerup
    position={position}
    color={0xffc0cb}
    image={teleport}
    iconScale={0.9}
  />
);

export { Teleport, Endurance, HealthRegen };
