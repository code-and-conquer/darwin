import { State } from '@darwin/types';
import spawnResource from './spawnResource';
import { countUnits } from '../../../helper/gameObjects';
import { countResources } from '../../../helper/consumables';
import handleSpawning from '../handleSpawning';

const RESOURCE_TO_UNIT_RATIO = 2;

const handleFoodSpawning = (state: State): State => {
  const unitCount = countUnits(state);
  const resourceCount = countResources(state);

  const limit = unitCount * RESOURCE_TO_UNIT_RATIO;

  return handleSpawning({
    limit,
    count: resourceCount,
    spawner: spawnResource,
    state,
  });
};

export default handleFoodSpawning;
