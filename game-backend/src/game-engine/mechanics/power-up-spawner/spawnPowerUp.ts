import hyperid from 'hyperid';
import { Consumable, Position, powerUpTypes } from '@darwin/types';
import pickRandom from '../../../helper/array';
import createPowerUp from './createPowerUp';

const generateId = hyperid();

const spawnPowerUp = (position: Position): Consumable => {
  const randomPowerUpType = pickRandom(powerUpTypes);

  const powerUp = createPowerUp({
    id: generateId(),
    position,
    subType: randomPowerUpType,
  });
  return powerUp;
};

export default spawnPowerUp;
