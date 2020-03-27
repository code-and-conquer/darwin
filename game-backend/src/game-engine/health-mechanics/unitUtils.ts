import { State } from '../../../../darwin-types/State';
import { GAME_OBJECT_TYPES } from '../../../../darwin-types/game-objects/GameObject';
import {
  Unit,
  HEALTH_LOSS_RATE,
} from '../../../../darwin-types/game-objects/Unit';
import {
  getGameObjectsPerType,
  removeGameObject,
} from '../../helper/gameObjects';
import produce from '../../helper/produce';

export default function updateHealth(state: State): State {
  return produce(state, draft => {
    const units = getGameObjectsPerType(state, GAME_OBJECT_TYPES.UNIT);
    units.forEach((gameObject: Unit) => {
      const unit = draft.objectMap[gameObject.id] as Unit;
      unit.health -= HEALTH_LOSS_RATE;
      if (unit.health <= 0) {
        removeGameObject(draft, gameObject.id);
      }
    });
  });
}
