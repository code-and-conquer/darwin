import { AttributeName, Unit } from '@darwin/types';
import { FOOD_REGENERATION_VALUE } from '../game-engine/mechanics/food-spawner/consumeFood';

export const ATTRIBUTE_BOUNDARIES: Record<
  AttributeName,
  { min: number; max: number }
> = {
  enduranceBoost: { min: -2, max: 2 },
  healthRegenBoost: { min: 0, max: FOOD_REGENERATION_VALUE },
};

export const getAttributeValue = (
  attributeName: AttributeName,
  value: number
): number =>
  Math.min(
    ATTRIBUTE_BOUNDARIES[attributeName].max,
    Math.max(value, ATTRIBUTE_BOUNDARIES[attributeName].min)
  );

export const updateAttribute = (
  unit: Unit,
  attributeName: AttributeName,
  reduce: (value: number) => number
): {
  value: number;
  hasChanged: boolean;
} => {
  const currentBoost = unit.attributes[attributeName];
  const newValue = getAttributeValue(attributeName, reduce(currentBoost));
  return { value: newValue, hasChanged: newValue !== currentBoost };
};
