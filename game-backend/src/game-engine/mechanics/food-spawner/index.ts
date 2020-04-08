import spawnFood from './spawnFood';
import { countUnits, countFood } from '../../../helper/gameObjects';
import createSpawner from '../createSpawner';

const FOOD_TO_UNIT_RATIO = 2;

const handleFoodSpawning = createSpawner({
  limit: state => countUnits(state) * FOOD_TO_UNIT_RATIO,
  count: countFood,
  spawn: spawnFood,
});

export default handleFoodSpawning;
