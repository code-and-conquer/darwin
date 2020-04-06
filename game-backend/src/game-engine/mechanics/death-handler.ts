import { State, Unit, GAME_OBJECT_TYPES } from '@darwin/types';
import produce from '../../helper/produce';
import {
  getGameObjectsPerType,
  removeGameObject,
} from '../../helper/gameObjects';

function handleDeath(state: State): State {
  return produce(state, draft => {
    getGameObjectsPerType(draft, GAME_OBJECT_TYPES.UNIT)
      .filter((unit: Unit) => unit.health <= 0)
      .forEach(unit => {
        const { objectIds, objectMap } = removeGameObject(draft, unit.id);
        draft.objectMap = objectMap;
        draft.objectIds = objectIds;
      });
    return draft;
  });
}

export default handleDeath;
