import { GameObject } from './GameObject';

export interface Unit extends GameObject {
  type: 'unit';
  health: number;
}
