import produce from 'immer';
import { State } from '../../../../darwin-types/State';
import spawnFood from './spawnFood';
import { countUnits, countFood } from '../../helpers/gameObjects';

const FOOD_TO_UNIT_RATIO = 2;

const handleFoodSpawning = (state: State): State => {
  const unitCount = countUnits(state);
  const foodCount = countFood(state);

  const foodSpawnLimit = unitCount * FOOD_TO_UNIT_RATIO;

  if (foodCount < foodSpawnLimit) {
    const food = spawnFood();
    return produce(state, draft => {
      draft.objectIds.push(food.id);
      draft.objectMap[food.id] = food;
    });
  }

  return state;
};

export default handleFoodSpawning;
