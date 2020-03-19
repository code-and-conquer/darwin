import produce from 'immer';
import { State } from '../../../darwin-types/State';
import spawnFood from './spawnFood';
import { countUnits, countFood } from '../helpers/gameObjects';

const handleFoodSpawning = (state: State): State => {
  const unitCount = countUnits(state);
  const foodCount = countFood(state);

  const foodSpawnLimit = unitCount * 2;

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
