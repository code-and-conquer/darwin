import { ATTRIBUTES } from '@darwin/types';
import { Consume } from './index';
import produce from '../../../helper/produce';
import { getUnit, removeGameObject } from '../../../helper/gameObjects';
import { updateAttribute } from '../../../helper/attributes';

const consumeEnduranceBoost: Consume = (id, state, userContext) => {
  return produce(state, draft => {
    const unit = getUnit(draft, userContext.unitId);
    const { value, hasChanged } = updateAttribute(
      unit,
      ATTRIBUTES.ENDURANCE_BOOST,
      currentBoost => currentBoost + 1
    );

    if (hasChanged) {
      unit.attributes[ATTRIBUTES.ENDURANCE_BOOST] = value;

      const { objectIds, objectMap } = removeGameObject(draft, id);
      draft.objectMap = objectMap;
      draft.objectIds = objectIds;
    }
  });
};

export default consumeEnduranceBoost;
