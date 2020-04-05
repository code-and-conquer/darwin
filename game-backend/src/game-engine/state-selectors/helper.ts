import {
  State,
  Consumable,
  ConsumableCategory,
  GameObject,
} from '@darwin/types';
import { getConsumablesPerCategory } from '../../helper/consumables';
import { getGameObjectsPerType } from '../../helper/gameObjects';

const getGameObjesctsSortedByPosition = <T extends GameObject>(
  objects: T[],
  gameObject: GameObject
): { obj: T; distance: number }[] => {
  return objects
    .filter(obj => obj.id !== gameObject.id)
    .map(obj => ({
      obj,
      distance:
        Math.abs(obj.position.x - gameObject.position.x) +
        Math.abs(obj.position.y - gameObject.position.y),
    }))
    .sort((a, b) => (a.distance < b.distance ? -1 : 1));
};

export const getNearestConsumableOfCategory = (
  state: State,
  object: GameObject,
  category: ConsumableCategory
): Consumable => {
  const objects = getConsumablesPerCategory(state, category);
  const sortedObjects = getGameObjesctsSortedByPosition<Consumable>(
    objects,
    object
  );
  const nearestObject =
    sortedObjects.length > 0 ? sortedObjects[0].obj : undefined;
  return nearestObject;
};

export const getNearestObjectOfType = <T extends GameObject>(
  state: State,
  object: GameObject,
  type: string
): T => {
  const objects = getGameObjectsPerType(state, type) as T[];
  const sortedObjects = getGameObjesctsSortedByPosition<T>(objects, object);
  const nearestObject =
    sortedObjects.length > 0 ? sortedObjects[0].obj : undefined;
  return nearestObject;
};
