import {
  State,
  UserContext,
  Unit,
  Consumable,
  ConsumableType,
  Consume,
} from '@darwin/types';
import { filterConsumables } from '../../helper/consumable';
import { Intent } from './Intent';
import { getObjectsOnField } from '../../helper/fields';
import { getUnit } from '../../helper/gameObjects';
import powerupMap from '../mechanics/powerup-spawner/powerups';
import consumeFood from '../mechanics/food-spawner/consumeFood';

const consumeMap: Record<ConsumableType, Consume> = {
  food: consumeFood,
  ...powerupMap,
};

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["execute"] }] */

/**
 * Represents the intent to consume a food object.
 */
export default class ConsumeIntent implements Intent {
  cost = 3;

  private static getConsumableInReach(
    state: State,
    unit: Unit
  ): Consumable | null {
    const objectsOnPosition = getObjectsOnField(state, unit.position);
    const consumable = objectsOnPosition
      ? filterConsumables(objectsOnPosition)[0]
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
      ? consumeMap[consumable.type](consumable.id, state, userContext)
      : state;
  }
}
