import {
  Food,
  GAME_OBJECT_TYPES,
  State,
  Position,
  MAX_HEALTH,
  UserContext,
} from '@darwin/types';
import produce from '../../../helper/produce';
import { removeGameObject, getUnit } from '../../../helper/gameObjects';

export const FOOD_REGENERATION_VALUE = 20;

const createFood = ({
  id,
  position,
}: {
  id: string;
  position: Position;
}): Food => ({
  id,
  position,
  moveBlocking: false,
  isConsumable: true,
  type: GAME_OBJECT_TYPES.FOOD,
  consume: (state: State, userContext: UserContext): State => {
    return produce(state, draft => {
      const unit = getUnit(draft, userContext.unitId);
      unit.health = Math.min(unit.health + FOOD_REGENERATION_VALUE, MAX_HEALTH);

      const { objectIds, objectMap } = removeGameObject(draft, id);
      draft.objectMap = objectMap;
      draft.objectIds = objectIds;
    });
  },
});

export default createFood;
