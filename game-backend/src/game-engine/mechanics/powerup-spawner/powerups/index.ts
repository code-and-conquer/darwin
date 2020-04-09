import { PowerupType, Consume } from '@darwin/types';
import consumeEnduranceBoost from './enduranceBoost';
import consumeTeleport from './teleport';

const powerupMap: Record<PowerupType, Consume> = {
  enduranceBoost: consumeEnduranceBoost,
  teleport: consumeTeleport,
};

export const powerupList = Object.keys(powerupMap) as PowerupType[];

export default powerupMap;
