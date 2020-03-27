import { Intent } from './Intent';
import produce from '../../helper/produce';
import { State } from '../../../../darwin-types/State';
import { UserContext } from '../../../../darwin-types/UserContext';
import { Unit, MAX_HEALTH } from '../../../../darwin-types/game-objects/Unit';
import { getObjectsOnField } from '../../helper/fields';
import { GAME_OBJECT_TYPES } from '../../../../darwin-types/game-objects/GameObject';
import { Food } from '../../../../darwin-types/game-objects/Food';

export const FOOD_REGENERATION_VALUE = 20;
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["execute"] }] */

/**
 * Represents the intent to consume a food object.
 */
export default class ConsumeIntent implements Intent {
  private static heal(health: number): number {
    return Math.min(health + FOOD_REGENERATION_VALUE, MAX_HEALTH);
  }

  private static getConsumableInReach(state: State, unit: Unit): Food | null {
    const objectsOnPosition = getObjectsOnField(state, unit.position);
    const consumable = objectsOnPosition
      ? objectsOnPosition.find(obj => obj.type === GAME_OBJECT_TYPES.FOOD)
      : null;
    return consumable;
  }

  execute(state: State, userContext: UserContext): State {
    return produce(state, draft => {
      const unit = draft.objectMap[userContext.unitId] as Unit;
      const consumable = ConsumeIntent.getConsumableInReach(state, unit);
      const canConsume = !!consumable;

      if (canConsume) {
        unit.health = ConsumeIntent.heal(unit.health);
        delete draft.objectMap[consumable.id];
        draft.objectIds = draft.objectIds.filter(id => id !== consumable.id);
      }
    });
  }
}
