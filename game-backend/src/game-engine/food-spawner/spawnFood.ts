import hyperid from 'hyperid';
import { Food } from '../../../../darwin-types/game-objects/Food';
import Position from '../../../../darwin-types/Position';

const generateId = hyperid();

const spawnFood = (position: Position): Food => {
  const food: Food = {
    id: generateId(),
    type: 'food',
    position,
  };
  return food;
};

export default spawnFood;
