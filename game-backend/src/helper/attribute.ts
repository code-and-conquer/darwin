import { AttributeName, Unit } from '@darwin/types';

export const ATTRIBUTE_BOUNDARIES: Record<
  AttributeName,
  { min: number; max: number }
> = {
  enduranceBoost: { min: -2, max: 2 },
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
