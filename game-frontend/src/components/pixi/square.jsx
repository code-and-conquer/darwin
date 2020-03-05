import React from 'react'
import { Graphics } from '@inlet/react-pixi';

function Square({ size, position }) {
  const { x: x1, y: y1 } = position
  const x2 = x1 + size
  const y2 = y1 + size
  return (
    <Graphics
      draw={
        g => {
          // clear the graphics
          g.clear()
          // start drawing
          g.lineStyle(1, 0xffd900, 1)

          g.moveTo(x1, y1)
          g.lineTo(x2, y1)
          g.lineTo(x2, y2)
          g.lineTo(x1, y2)
          g.lineTo(x1, y1)
        }
      }
    />
  )
}

export default Square