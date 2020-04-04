import { State } from '@darwin/types';
import spawnFood from './spawnFood';
import { countUnits, countFood } from '../../../helper/gameObjects';
import spawn from '../spawn';

const FOOD_TO_UNIT_RATIO = 2;

const handleFoodSpawning = (state: State): State => {
  const unitCount = countUnits(state);
  const foodCount = countFood(state);

  const limit = unitCount * FOOD_TO_UNIT_RATIO;

  return spawn({ limit, count: foodCount, spawner: spawnFood, state });
};

export default handleFoodSpawning;
