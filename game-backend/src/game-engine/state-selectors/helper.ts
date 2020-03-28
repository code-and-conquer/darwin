import { State } from '../../../../darwin-types/State';
import { GameObject } from '../../test-helper/StateBuilder';
import { getGameObjectsPerType } from '../../helper/gameObjects';

const getNearestObjectOfType = <T extends GameObject>(
  state: State,
  object: GameObject,
  type: string
): T => {
  const objects = getGameObjectsPerType(state, type) as T[];
  const sortedObjects = objects
    .map(obj => ({
      obj,
      distance:
        Math.abs(obj.position.x - object.position.x) +
        Math.abs(obj.position.y - object.position.y),
    }))
    .sort((a, b) => (a.distance < b.distance ? -1 : 1));
  const nearestObject =
    sortedObjects.length > 0 ? sortedObjects[0].obj : undefined;
  return nearestObject;
};

export default getNearestObjectOfType;
