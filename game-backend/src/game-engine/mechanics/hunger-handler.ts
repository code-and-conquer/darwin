import { State, Unit, GAME_OBJECT_TYPES, ATTRIBUTES } from '@darwin/types';
import produce from '../../helper/produce';
import { getGameObjectsPerType } from '../../helper/gameObjects';

export const HEALTH_LOSS_RATE = 3;
// Disable no-param-reassign due to immer.js handling
/* eslint-disable no-param-reassign */

function handleHunger(state: State): State {
  return produce(state, draft => {
    getGameObjectsPerType<Unit>(draft, GAME_OBJECT_TYPES.UNIT).forEach(unit => {
      unit.health -=
        HEALTH_LOSS_RATE - unit.attributes[ATTRIBUTES.ENDURANCE_BOOST];
    });
  });
}

export default handleHunger;
