import { State } from '@darwin/types';
import spawnPowerUp from './spawnPowerUp';
import { countUnits, countPowerUps } from '../../../helper/gameObjects';
import spawn from '../spawn';

const POWER_UP_TO_UNIT_RATIO = 0.5;

const handlePowerUpSpawning = (state: State): State => {
  const unitCount = countUnits(state);
  const powerUpCount = countPowerUps(state);

  const limit = unitCount * POWER_UP_TO_UNIT_RATIO;

  return spawn({ limit, count: powerUpCount, spawner: spawnPowerUp, state });
};

export default handlePowerUpSpawning;
