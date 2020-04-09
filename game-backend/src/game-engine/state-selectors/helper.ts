import { State } from '@darwin/types';
import { GameObject } from '../../test-helper/StateBuilder';
import { getGameObjectsPerType } from '../../helper/gameObjects';

export const getObjectsSortedDistance = <T extends GameObject>(
  objects: T[],
  object: GameObject
): {
  obj: T;
  distance: number;
}[] => {
  const sortedObjects = objects
    .filter(gameObject => gameObject.id !== object.id)
    .map(obj => ({
      obj,
      distance:
        Math.abs(obj.position.x - object.position.x) +
        Math.abs(obj.position.y - object.position.y),
    }))
    .sort((a, b) => (a.distance < b.distance ? -1 : 1));
  return sortedObjects;
};

const getNearestObjectOfType = <T extends GameObject>(
  state: State,
  object: GameObject,
  type: string
): T => {
  const objects = getGameObjectsPerType(state, type) as T[];
  const sortedObjects = getObjectsSortedDistance<T>(objects, object);
  const nearestObject =
    sortedObjects.length > 0 ? sortedObjects[0].obj : undefined;
  return nearestObject;
};

export default getNearestObjectOfType;
