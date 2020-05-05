import { Position } from '@darwin/types';

const warpedArena: Position[] = [
  // top left
  { x: 6, y: 3 },
  { x: 6, y: 4 },

  { x: 3, y: 6 },
  { x: 4, y: 6 },

  // top right
  { x: 13, y: 3 },
  { x: 13, y: 4 },

  { x: 15, y: 6 },
  { x: 16, y: 6 },

  // bottom left
  { x: 3, y: 13 },
  { x: 4, y: 13 },

  { x: 6, y: 15 },
  { x: 6, y: 16 },

  // bottom right
  { x: 15, y: 13 },
  { x: 16, y: 13 },

  { x: 13, y: 15 },
  { x: 13, y: 16 },

  // core
  { x: 8, y: 8 },
  { x: 8, y: 11 },
  { x: 11, y: 8 },
  { x: 11, y: 11 },
];

export default warpedArena;
