import React from 'react';
import { Graphics } from '@inlet/react-pixi';

function Square({
  size,
  position,
  color = 0xffffff,
  alpha = 1,
  lineWidth = 1,
}) {
  const { x, y } = position;
  return (
    <Graphics
      draw={g => {
        // clear the graphics
        g.clear();

        g.lineStyle(lineWidth, color, alpha);

        g.drawRect(x, y, size, size);
      }}
    />
  );
}

export default Square;
