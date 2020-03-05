import React from 'react'
import Circle from '../pixi/circle'

function Unit({ position }) {
  return <Circle position={position} radius={2} color={0xff700b} />
}

export default Unit