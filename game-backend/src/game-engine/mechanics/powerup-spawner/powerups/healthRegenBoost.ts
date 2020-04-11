import { Consume, AttributeName } from '@darwin/types';
import produce from '../../../../helper/produce';
import { getUnit, removeGameObject } from '../../../../helper/gameObjects';
import { updateAttribute } from '../../../../helper/attribute';
import { FOOD_REGENERATION_VALUE } from '../../food-spawner/consumeFood';

const consumeHealthRegenBoost: Consume = (id, state, userContext) => {
  return produce(state, draft => {
    const unit = getUnit(draft, userContext.unitId);
    const { value, hasChanged } = updateAttribute(
      unit,
      AttributeName.HealthRegenBoost,
      currentBoost => currentBoost + FOOD_REGENERATION_VALUE / 2
    );

    if (hasChanged) {
      unit.attributes.healthRegenBoost = value;

      const { objectIds, objectMap } = removeGameObject(draft, id);
      draft.objectMap = objectMap;
      draft.objectIds = objectIds;
    }
  });
};

export default consumeHealthRegenBoost;
