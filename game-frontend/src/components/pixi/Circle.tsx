import React from 'react';
import { Graphics } from '@inlet/react-pixi';
import { PixiGeometricFormProps } from './PixiGeometricFormProps';

interface Props extends PixiGeometricFormProps {
  radius: number;
}

function Circle({
  radius,
  position,
  color = 0xffffff,
  alpha = 1,
  lineWidth = 1,
}: Props): JSX.Element {
  const { x, y } = position;
  return (
    <Graphics
      draw={g => {
        // clear the graphics
        g.clear();
        // start drawing
        g.lineStyle(lineWidth, color, alpha);
        g.drawCircle(x, y, radius);
      }}
    />
  );
}

export default Circle;
