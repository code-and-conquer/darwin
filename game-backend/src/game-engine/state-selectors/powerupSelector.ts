import { Consumable, State, GameObject } from '@darwin/types';
import { getObjectsSortedDistance } from './helper';
import { getPowerups, filterPowerups } from '../../helper/powerup';

export const selectPowerups = (state: State): Consumable[] => {
  return getPowerups(state);
};

export const getNearestPowerup = (
  state: State,
  object: GameObject
): Consumable => {
  const objects = state.objectIds.map(id => state.objectMap[id]);
  const nearestObjects = getObjectsSortedDistance(objects, object);
  const nearestPowerup = filterPowerups(
    nearestObjects.map(wrapper => wrapper.obj)
  )[0];
  return nearestPowerup;
};
