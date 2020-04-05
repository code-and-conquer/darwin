import { MAX_HEALTH } from '@darwin/types';
import produce from '../../../helper/produce';
import { getUnit, removeGameObject } from '../../../helper/gameObjects';
import { FOOD_REGENERATION_VALUE } from '../../mechanics/food-spawner/createFood';
import { Consume } from './index';

const consumeFood: Consume = (id, state, userContext) => {
  return produce(state, draft => {
    const unit = getUnit(draft, userContext.unitId);
    unit.health = Math.min(unit.health + FOOD_REGENERATION_VALUE, MAX_HEALTH);

    const { objectIds, objectMap } = removeGameObject(draft, id);
    draft.objectMap = objectMap;
    draft.objectIds = objectIds;
  });
};

export default consumeFood;
