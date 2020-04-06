import { State } from '@darwin/types';
import spawnPowerup from './spawnPowerup';
import { countUnits } from '../../../helper/gameObjects';
import { generateFreePosition } from '../../../helper/fields';
import { countPowerups } from '../../../helper/powerup';

const POWERUP_TO_UNIT_RATIO = 0.5;

const handlePowerupSpawning = (state: State): State => {
  const unitCount = countUnits(state);
  const powerupCount = countPowerups(state);

  const powerupSpawnLimit = Math.floor(unitCount * POWERUP_TO_UNIT_RATIO);

  if (powerupCount < powerupSpawnLimit) {
    const position = generateFreePosition(state);
    const food = spawnPowerup(position);

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

export default handlePowerupSpawning;
