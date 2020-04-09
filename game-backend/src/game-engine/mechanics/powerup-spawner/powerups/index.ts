import { PowerupType, Consume } from '@darwin/types';
import consumeEnduranceBoost from './enduranceBoost';

const powerupMap: Record<PowerupType, Consume> = {
  enduranceBoost: consumeEnduranceBoost,
};

export const powerupList = Object.keys(powerupMap) as PowerupType[];

export default powerupMap;
