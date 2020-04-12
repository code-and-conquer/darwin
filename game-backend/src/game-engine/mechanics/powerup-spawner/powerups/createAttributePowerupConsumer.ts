import { Consume, AttributeName, State } from '@darwin/types';
import produce from '../../../../helper/produce';
import { getUnit, removeGameObject } from '../../../../helper/gameObjects';
import { updateAttribute } from '../../../../helper/attribute';

type CreateAttributePowerupConsumer = (
  attributeName: AttributeName,
  reduce: (currenBoost: number) => number
) => Consume;

const createAttributePowerupConsumer: CreateAttributePowerupConsumer = (
  attributeName,
  reduce
) => (id, state, userContext): State => {
  return produce(state, draft => {
    const unit = getUnit(draft, userContext.unitId);
    const { value, hasChanged } = updateAttribute(unit, attributeName, reduce);

    if (hasChanged) {
      unit.attributes[attributeName] = value;

      const { objectIds, objectMap } = removeGameObject(draft, id);
      draft.objectMap = objectMap;
      draft.objectIds = objectIds;
    }
  });
};

export default createAttributePowerupConsumer;
