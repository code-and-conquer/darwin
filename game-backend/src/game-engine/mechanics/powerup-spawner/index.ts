import spawnPowerup from './spawnPowerup';
import { countUnits } from '../../../helper/gameObjects';
import { countPowerups } from '../../../helper/powerup';
import createSpawner from '../createSpawner';

const POWERUP_TO_UNIT_RATIO = 0.5;

const handlePowerupSpawning = createSpawner({
  limit: state => Math.floor(countUnits(state) * POWERUP_TO_UNIT_RATIO),
  count: countPowerups,
  spawn: spawnPowerup,
});

export default handlePowerupSpawning;
