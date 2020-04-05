import { Consumable, State, Unit, CONSUMABLE_CATEGORIES } from '@darwin/types';
import { getNearestConsumableOfCategory } from './helper';
import { getConsumablesPerCategory } from '../../helper/consumables';

export const selectFoods = (state: State): Consumable[] => {
  return getConsumablesPerCategory(state, CONSUMABLE_CATEGORIES.POWER_UP);
};

export const getNearestFood = (state: State, unit: Unit): Consumable => {
  return getNearestConsumableOfCategory(
    state,
    unit,
    CONSUMABLE_CATEGORIES.RESOURCE
  );
};
