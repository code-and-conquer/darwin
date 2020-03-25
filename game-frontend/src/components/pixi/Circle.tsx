import React, { FC } from 'react';
import Graphics from './Graphics';
import { PixiGeometricFormProps } from './PixiGeometricFormProps';

interface Props extends PixiGeometricFormProps {
  radius: number;
}

const Circle: FC<Props> = ({
  radius,
  position,
  color = 0xffffff,
  fill = undefined,
  alpha = 1,
  lineWidth = 1,
}) => {
  const { x, y } = position;
  return (
    <Graphics
      fill={fill}
      alpha={alpha}
      draw={(g): void => {
        g.lineStyle(lineWidth, color);
        g.drawCircle(x, y, radius);
      }}
    />
  );
};

export default Circle;
