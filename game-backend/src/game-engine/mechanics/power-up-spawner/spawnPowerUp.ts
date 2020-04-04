import hyperid from 'hyperid';
import { PowerUp, Position } from '@darwin/types';
import { powerUpSpawners } from './createPowerUp';
import pickRandom from '../../../helper/array';

const generateId = hyperid();

const spawnPowerUp = (position: Position): PowerUp => {
  const createRandomPowerUp = pickRandom(powerUpSpawners);

  const powerUp: PowerUp = createRandomPowerUp({
    id: generateId(),
    position,
  });
  return powerUp;
};

export default spawnPowerUp;
