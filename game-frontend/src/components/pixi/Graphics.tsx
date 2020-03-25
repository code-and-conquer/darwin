import React, { FC } from 'react';
import { Graphics as PixiGraphics } from '@inlet/react-pixi';

type props = {
  draw: (g: PIXI.Graphics) => void;
  fill?: number | undefined;
  alpha?: number;
};

const Graphics: FC<props> = ({ draw, fill, alpha = 1, ...props }) => {
  return (
    <PixiGraphics
      {...props}
      draw={(g): void => {
        g.clear();
        if (fill !== undefined) {
          g.beginFill(fill, alpha);
        }
        draw(g);
        if (fill !== undefined) {
          g.endFill();
        }
      }}
    />
  );
};

export default Graphics;
