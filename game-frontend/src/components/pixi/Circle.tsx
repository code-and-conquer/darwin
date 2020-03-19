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
      draw={(g): void => {
        g.beginFill(fill);
        g.lineStyle(lineWidth, color, alpha);
        g.drawCircle(x, y, radius);
        g.endFill();
      }}
    />
  );
};

export default Circle;
