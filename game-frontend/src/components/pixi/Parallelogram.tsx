import React, { FC } from 'react';
import Graphics from './Graphics';
import { PixiGeometricFormProps } from './PixiGeometricFormProps';

interface Props extends PixiGeometricFormProps {
  size: number;
  sizeVariance?: number;
}

const Parallelogram: FC<Props> = ({
  size,
  position,
  sizeVariance = 3,
  fill,
  alpha,
  lineWidth = 0,
}) => {
  const { x, y } = position;
  return (
    <Graphics
      fill={fill}
      alpha={alpha}
      draw={(g): void => {
        const startX = x + sizeVariance;
        const startY = y + sizeVariance;

        g.lineStyle(lineWidth);

        g.moveTo(startX, startY);
        g.lineTo(x + size, y);
        g.lineTo(x + size - sizeVariance, y + size - sizeVariance);
        g.lineTo(x, y + size);
        g.lineTo(startX, startY);
      }}
    />
  );
};

export default Parallelogram;
