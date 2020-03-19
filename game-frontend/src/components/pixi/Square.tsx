import React, { FC } from 'react';
import Graphics from './Graphics';
import { PixiGeometricFormProps } from './PixiGeometricFormProps';

interface Props extends PixiGeometricFormProps {
  size: number;
}

const Square: FC<Props> = ({
  size,
  position,
  color = 0xffffff,
  alpha = 1,
  lineWidth = 1,
}) => {
  const { x, y } = position;
  return (
    <Graphics
      draw={(g): void => {
        g.lineStyle(lineWidth, color, alpha);

        g.drawRect(x, y, size, size);
      }}
    />
  );
};

export default Square;
