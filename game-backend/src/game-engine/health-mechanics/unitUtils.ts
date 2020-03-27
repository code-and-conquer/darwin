import { State } from '../../../../darwin-types/State';
import { GAME_OBJECT_TYPES } from '../../../../darwin-types/game-objects/GameObject';
import {
  Unit,
  HEALTH_LOSS_RATE,
} from '../../../../darwin-types/game-objects/Unit';
import { getGameObjectsPerType } from '../../helper/gameObjects';
import produce from '../../helper/produce';

export default function updateHealth(state: State): State {
  return produce(state, draft => {
    const units = getGameObjectsPerType(state, GAME_OBJECT_TYPES.UNIT);
    units.forEach((gameObject: Unit) => {
      const unit = draft.objectMap[gameObject.id] as Unit;
      unit.health -= HEALTH_LOSS_RATE;
      if (unit.health === 0) {
        delete draft.objectMap[gameObject.id];
        draft.objectIds = draft.objectIds.filter(id => id !== gameObject.id);
      }
    });
  });
}
