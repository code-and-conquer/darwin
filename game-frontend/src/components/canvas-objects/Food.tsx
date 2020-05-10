import React, { FC } from 'react';
import { Position } from '@darwin/types';
import { Sprite } from '@inlet/react-pixi';
import { FIELD_SIZE } from '../../constants/stage';
import food from '../../assets/images/endurance.png';

type Props = {
  position: Position;
};

const Food: FC<Props> = ({ position }) => (
  <>
    <Sprite
      height={FIELD_SIZE}
      width={FIELD_SIZE}
      image={food}
      x={position.x}
      y={position.y}
    />
  </>
);

export default Food;
