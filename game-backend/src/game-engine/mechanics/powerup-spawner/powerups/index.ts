import { PowerupType, Consume } from '@darwin/types';
import consumeEnduranceBoost from './enduranceBoost';
import consumeTeleport from './teleport';
import consumeHealthRegenBoost from './healthRegenBoost';

const powerupMap: Record<PowerupType, Consume> = {
  enduranceBoost: consumeEnduranceBoost,
  teleport: consumeTeleport,
  healthRegenBoost: consumeHealthRegenBoost,
};

export const powerupList = Object.keys(powerupMap) as PowerupType[];

export default powerupMap;
