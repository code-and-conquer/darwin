import { State } from '@darwin/types';
import spawnPowerUp from './spawnPowerUp';
import { countUnits } from '../../../helper/gameObjects';
import handleSpawning from '../handleSpawning';
import { countPowerUps } from '../../../helper/consumables';

const POWER_UP_TO_UNIT_RATIO = 0.5;

const handlePowerUpSpawning = (state: State): State => {
  const unitCount = countUnits(state);
  const powerUpCount = countPowerUps(state);

  const limit = unitCount * POWER_UP_TO_UNIT_RATIO;

  return handleSpawning({
    limit,
    count: powerUpCount,
    spawner: spawnPowerUp,
    state,
  });
};

export default handlePowerUpSpawning;
