import hyperid from 'hyperid';
import { Position, Food } from '@darwin/types';
import createFood from './createFood';

const generateId = hyperid();

const spawnFood = (position: Position): Food => {
  const food: Food = createFood({
    id: generateId(),
    position,
  });
  return food;
};

export default spawnFood;
