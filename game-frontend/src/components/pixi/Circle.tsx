import React, { FC } from 'react';
import { Graphics } from '@inlet/react-pixi';
import { PixiGeometricFormProps } from './PixiGeometricFormProps';

interface Props extends PixiGeometricFormProps {
  radius: number;
}

const Circle: FC<Props> = ({
  radius,
  position,
  color = 0xffffff,
  alpha = 1,
  lineWidth = 1,
}) => {
  const { x, y } = position;
  return (
    <Graphics
      draw={(g): void => {
        // clear the graphics
        g.clear();
        // start drawing
        g.lineStyle(lineWidth, color, alpha);
        g.drawCircle(x, y, radius);
      }}
    />
  );
};

export default Circle;
