import { State } from '../../../../darwin-types/State';
import spawnFood from './spawnFood';
import {
  countUnits,
  countFood,
  generateFreePosition,
} from '../../helper/gameObjects';

const FOOD_TO_UNIT_RATIO = 2;

const handleFoodSpawning = (state: State): State => {
  const unitCount = countUnits(state);
  const foodCount = countFood(state);

  const foodSpawnLimit = unitCount * FOOD_TO_UNIT_RATIO;

  if (foodCount < foodSpawnLimit) {
    const position = generateFreePosition(state);
    const food = spawnFood(position);

    return {
      ...state,
      objectMap: {
        ...state.objectMap,
        [food.id]: food,
      },
      objectIds: [...state.objectIds, food.id],
    };
  }

  return state;
};

export default handleFoodSpawning;
