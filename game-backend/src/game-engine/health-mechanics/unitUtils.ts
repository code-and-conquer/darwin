import { State } from '../../../../darwin-types/State';
import {
  ObjectId,
  GameObject,
  GAME_OBJECT_TYPES,
} from '../../../../darwin-types/game-objects/GameObject';
import { Unit } from '../../../../darwin-types/game-objects/Unit';
import { HEALTH_LOSS_RATE } from '../../constants/gameObjects';
import { getGameObjectsPerType } from '../../helper/gameObjects';
import produce from '../../helper/produce';

export function updateHealth(state: State) {
  return produce(state, draft => {
    const units = getGameObjectsPerType(state, GAME_OBJECT_TYPES.UNIT);
    units.forEach((unit: Unit) => {
      unit.health *= HEALTH_LOSS_RATE;
    });
  });
}
