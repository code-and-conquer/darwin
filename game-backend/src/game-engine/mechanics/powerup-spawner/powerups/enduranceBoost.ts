import { Consume, AttributeName } from '@darwin/types';
import produce from '../../../../helper/produce';
import { getUnit, removeGameObject } from '../../../../helper/gameObjects';
import { updateAttribute } from '../../../../helper/attribute';

const consumeEnduranceBoost: Consume = (id, state, userContext) => {
  return produce(state, draft => {
    const unit = getUnit(draft, userContext.unitId);
    const { value, hasChanged } = updateAttribute(
      unit,
      AttributeName.EnduranceBoost,
      currentBoost => currentBoost + 1
    );

    if (hasChanged) {
      unit.attributes.enduranceBoost = value;

      const { objectIds, objectMap } = removeGameObject(draft, id);
      draft.objectMap = objectMap;
      draft.objectIds = objectIds;
    }
  });
};

export default consumeEnduranceBoost;
