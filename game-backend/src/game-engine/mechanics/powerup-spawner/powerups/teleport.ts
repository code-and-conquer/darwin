import { Consume } from '@darwin/types';
import produce from '../../../../helper/produce';
import { getUnit, removeGameObject } from '../../../../helper/gameObjects';
import { generateFreePosition } from '../../../../helper/fields';

const consumeTeleport: Consume = (id, state, userContext) => {
  return produce(state, draft => {
    const unit = getUnit(draft, userContext.unitId);
    const { objectIds, objectMap } = removeGameObject(draft, id);
    const newPosition = generateFreePosition(draft);
    unit.position.x = newPosition.x;
    unit.position.y = newPosition.y;
    draft.objectMap = objectMap;
    draft.objectIds = objectIds;
  });
};

export default consumeTeleport;
