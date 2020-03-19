import hyperid from 'hyperid';
import { ARENA_WIDTH, ARENA_HEIGHT } from '../../../darwin-types/Arena';
import { Food } from '../../../darwin-types/game-objects/Food';

const generateId = hyperid();

const spawnFood = (): Food => {
  const food: Food = {
    id: generateId(),
    type: 'food',
    position: {
      x: Math.floor(Math.random() * ARENA_WIDTH),
      y: Math.floor(Math.random() * ARENA_HEIGHT),
    },
  };
  return food;
};

export default spawnFood;
