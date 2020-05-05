import { Position } from '@darwin/types';

const warpedArena: Position[] = [
  // top left
  { x: 6, y: 4 },
  { x: 6, y: 5 },
  { x: 6, y: 6 },
  { x: 5, y: 6 },
  { x: 4, y: 6 },

  // top right
  { x: 4, y: 13 },
  { x: 5, y: 13 },
  { x: 6, y: 13 },
  { x: 6, y: 14 },
  { x: 6, y: 15 },

  // bottom left
  { x: 13, y: 4 },
  { x: 13, y: 5 },
  { x: 13, y: 6 },
  { x: 14, y: 6 },
  { x: 15, y: 6 },

  // bottom right
  { x: 14, y: 13 },
  { x: 15, y: 13 },
  { x: 13, y: 13 },
  { x: 13, y: 14 },
  { x: 13, y: 15 },

  // core
  { x: 8, y: 8 },
  { x: 8, y: 11 },
  { x: 11, y: 8 },
  { x: 11, y: 11 },
];

export default warpedArena;
