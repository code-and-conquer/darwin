import { State } from '../../../../darwin-types/State';
import produce from '../../helper/produce';
import {
  ObjectId,
  GameObject,
  GAME_OBJECT_TYPES,
} from '../../../../darwin-types/game-objects/GameObject';
import { Unit } from '../../../../darwin-types/game-objects/Unit';
import { HEALTH_LOSS_RATE } from '../../constants/gameObjects';
import { getGameObjectsPerType } from '../../helper/gameObjects';

export function updateHealth(state: State) {
  const newState = produce(state, draft => {
    const units = getGameObjectsPerType(state, GAME_OBJECT_TYPES.UNIT);
    units.forEach((unit: Unit) => {
      unit.health *= HEALTH_LOSS_RATE;
    });
  });
  return newState;
}
