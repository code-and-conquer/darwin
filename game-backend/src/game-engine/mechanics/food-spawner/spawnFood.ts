import hyperid from 'hyperid';
import { Food } from '../../../../../darwin-types/game-objects/Food';
import Position from '../../../../../darwin-types/Position';
import { createFood } from '../../../helper/gameObjects';

const generateId = hyperid();

const spawnFood = (position: Position): Food => {
  const food: Food = createFood({
    id: generateId(),
    position,
  });
  return food;
};

export default spawnFood;
