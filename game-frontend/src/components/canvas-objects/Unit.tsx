import React from 'react';
import Square from '../pixi/square';

function Unit({ position }) {
  return <Square position={position} size={5} color={0xffd900} />;
}

export default Unit;
