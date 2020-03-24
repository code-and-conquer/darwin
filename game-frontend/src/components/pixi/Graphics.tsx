import React, { FC } from 'react';
import { Graphics as PixiGraphics } from '@inlet/react-pixi';

type props = { draw: (g: PIXI.Graphics) => void; fill?: number | undefined };

const Graphics: FC<props> = ({ draw, fill, ...props }) => {
  return (
    <PixiGraphics
      {...props}
      draw={(g): void => {
        g.clear();
        if (fill) {
          g.beginFill(fill);
        }
        draw(g);
        if (fill) {
          g.endFill();
        }
      }}
    />
  );
};

export default Graphics;
