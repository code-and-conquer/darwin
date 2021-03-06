import React, { FC } from 'react';
import Graphics from './Graphics';
import { PixiGeometricFormProps } from './PixiGeometricFormProps';

interface Props extends PixiGeometricFormProps {
  height: number;
  width: number;
}

const Rectangle: FC<Props> = ({
  height,
  width,
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
      draw={(g): void => {
        g.lineStyle(lineWidth, color, alpha);
        g.drawRect(x, y, width, height);
      }}
    />
  );
};

export default Rectangle;
