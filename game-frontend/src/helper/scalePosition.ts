import { Position } from '@darwin/types';
import { SCALE_FACTOR } from '../constants/stage';

const scalePosition = (position: Position): Position => ({
  x: position.x * SCALE_FACTOR,
  y: position.y * SCALE_FACTOR,
});

export default scalePosition;
