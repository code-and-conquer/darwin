import hyperid from 'hyperid';
import { Position, Consumable } from '@darwin/types';
import { createFood } from '../../../helper/gameObjects';

const generateId = hyperid();

const spawnFood = (position: Position): Consumable => {
  const food: Consumable = createFood({
    id: generateId(),
    position,
  });
  return food;
};

export default spawnFood;
