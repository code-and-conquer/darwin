import { State, Unit, GameObjectTypes } from '@darwin/types';
import produce from '../../helper/produce';
import {
  getGameObjectsPerType,
  removeGameObject,
} from '../../helper/gameObjects';

export const HEALTH_LOSS_RATE = 3;
// Disable no-param-reassign due to immer.js handling
/* eslint-disable no-param-reassign */

function handleHunger(state: State): State {
  return produce(state, draft => {
    getGameObjectsPerType(draft, GameObjectTypes.Unit).forEach((unit: Unit) => {
      unit.health -= HEALTH_LOSS_RATE - unit.attributes.enduranceBoost;
      if (unit.health <= 0) {
        const { objectIds, objectMap } = removeGameObject(draft, unit.id);
        draft.objectMap = objectMap;
        draft.objectIds = objectIds;
      }
    });
  });
}

export default handleHunger;
