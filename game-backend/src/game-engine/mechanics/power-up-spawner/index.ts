import { State } from '@darwin/types';
import spawnPowerUp from './spawnPowerUp';
import { countUnits, countPowerUps } from '../../../helper/gameObjects';
import { generateFreePosition } from '../../../helper/fields';

const POWER_UP_TO_UNIT_RATIO = 0.5;

const handlePowerUpSpawning = (state: State): State => {
  const unitCount = countUnits(state);
  const powerUpCount = countPowerUps(state);

  const powerUpSpawnLimit = unitCount * POWER_UP_TO_UNIT_RATIO;

  if (powerUpCount < powerUpSpawnLimit) {
    const position = generateFreePosition(state);
    const powerUp = spawnPowerUp(position);

    return {
      ...state,
      objectMap: {
        ...state.objectMap,
        [powerUp.id]: powerUp,
      },
      objectIds: [...state.objectIds, powerUp.id],
    };
  }

  return state;
};

export default handlePowerUpSpawning;
