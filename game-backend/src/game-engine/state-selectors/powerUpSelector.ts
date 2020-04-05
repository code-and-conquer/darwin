import { State, CONSUMABLE_CATEGORIES, Consumable } from '@darwin/types';

import { getConsumablesPerCategory } from '../../helper/consumables';

const selectPowerUps = (state: State): Consumable[] => {
  return getConsumablesPerCategory(state, CONSUMABLE_CATEGORIES.POWER_UP);
};

export default selectPowerUps;
