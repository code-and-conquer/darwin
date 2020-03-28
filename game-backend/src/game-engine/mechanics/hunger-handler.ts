import { State } from '../../../../darwin-types/State';
import produce from '../../helper/produce';
import {
  getGameObjectsPerType,
  removeGameObject,
} from '../../helper/gameObjects';
import { GAME_OBJECT_TYPES } from '../../../../darwin-types/game-objects/GameObject';
import { Unit } from '../../../../darwin-types/game-objects/Unit';

export const HEALTH_LOSS_RATE = 3;
// Disable no-param-reassign due to immer.js handling
/* eslint-disable no-param-reassign */

function handleHunger(state: State): State {
  return produce(state, draft => {
    getGameObjectsPerType(state, GAME_OBJECT_TYPES.UNIT).forEach(
      (unit: Unit) => {
        unit.health -= HEALTH_LOSS_RATE;
        if (unit.health <= 0) {
          const { objectIds, objectMap } = removeGameObject(draft, unit.id);
          draft.objectMap = objectMap;
          draft.objectIds = objectIds;
        }
      }
    );
  });
}

export default handleHunger;
