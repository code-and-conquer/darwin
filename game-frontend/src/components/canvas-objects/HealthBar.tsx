import React, { FC } from 'react';
import { Position } from '@darwin/types';
import { FIELD_SIZE } from '../../constants/stage';
import Rectangle from '../pixi/Rectangle';

type Props = {
  position: Position;
  health: number;
};

const barHeightScale = 0.05;
const barHeight = FIELD_SIZE * barHeightScale;
const barWidthScale = 0.7;
const barWidth = FIELD_SIZE * barWidthScale;
const sideMargin = (FIELD_SIZE - barWidth) / 2;
const topMarginScale = 0.05;
const topMargin = FIELD_SIZE * topMarginScale;

const HealthBar: FC<Props> = ({ position, health }) => {
  const percentage = health / 100;
  let color = 0x2ec655;
  if (percentage < 0.2) {
    color = 0xff193b;
  } else if (percentage < 0.7) {
    color = 0xf5a433;
  }
  return (
    <>
      <Rectangle
        position={{
          x: position.x + sideMargin,
          y: position.y - topMargin,
        }}
        height={barHeight}
        width={barWidth}
        color={0x000000}
        fill={0x000000}
      />
      <Rectangle
        position={{
          x: position.x + sideMargin,
          y: position.y - topMargin,
        }}
        height={barHeight}
        width={barWidth * percentage}
        color={color}
        fill={color}
      />
    </>
  );
};

export default HealthBar;
