import { State, UserContext, Unit, Consumable } from '@darwin/types';
import { Intent } from './Intent';
import { getObjectsOnField } from '../../helper/fields';
import { getUnit } from '../../helper/gameObjects';
import consumeMap from './consume/index';
import { getConsumables } from '../../helper/consumables';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["execute"] }] */

/**
 * Represents the intent to consume a consumable object.
 */
export default class ConsumeIntent implements Intent {
  private static getConsumableInReach(state: State, unit: Unit): Consumable {
    const objectsOnPosition = getObjectsOnField(state, unit.position);
    const consumable = objectsOnPosition
      ? getConsumables(objectsOnPosition)[0]
      : null;
    return consumable;
  }

  execute(state: State, userContext: UserContext): State {
    const unit = getUnit(state, userContext.unitId);

    if (!unit) {
      return state;
    }
    const consumable = ConsumeIntent.getConsumableInReach(state, unit);
    const canConsume = !!consumable;

    return canConsume
      ? consumeMap[consumable.subType](consumable.id, state, userContext)
      : state;
  }
}
