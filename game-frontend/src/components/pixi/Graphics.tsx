import React, { FC } from 'react';
import { Graphics as PixiGraphics } from '@inlet/react-pixi';

type props = { draw: (g: PIXI.Graphics) => void };

const Graphics: FC<props> = ({ draw, ...props }) => {
  return (
    <PixiGraphics
      {...props}
      draw={(g): void => {
        g.clear();
        draw(g);
      }}
    />
  );
};

export default Graphics;
