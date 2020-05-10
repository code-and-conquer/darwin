import React, { FC } from 'react';
import { Position } from '@darwin/types';
import { Sprite } from '@inlet/react-pixi';
import { FIELD_SIZE } from '../../constants/stage';
import HealthBar from './HealthBar';
import unit1 from '../../assets/images/unit1.png';
import unit2 from '../../assets/images/unit2.png';

type Props = {
  position: Position;
  health: number;
  isOwn: boolean;
};

const squareScale = 0.8;
const squareSize = FIELD_SIZE * squareScale;
const squareMargin = (FIELD_SIZE - squareSize) / 2;

const Unit: FC<Props> = ({ position, isOwn, health }) => {
  return (
    <>
      <Sprite
        height={squareSize}
        width={squareSize}
        image={isOwn ? unit1 : unit2}
        x={position.x + squareMargin}
        y={position.y + squareMargin}
      />
      <HealthBar position={position} health={health} />
    </>
  );
};

export default Unit;
