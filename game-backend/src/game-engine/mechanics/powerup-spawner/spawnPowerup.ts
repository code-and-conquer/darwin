import hyperid from 'hyperid';
import { Position, Consumable } from '@darwin/types';
import createPowerup from './createPowerup';
import { powerupList } from './powerups/index';
import { pickRandom } from '../../../helper/array';

const generateId = hyperid();

const spawnPowerup = (position: Position): Consumable => {
  const powerup: Consumable = createPowerup({
    id: generateId(),
    position,
    type: pickRandom(powerupList),
  });
  return powerup;
};

export default spawnPowerup;
