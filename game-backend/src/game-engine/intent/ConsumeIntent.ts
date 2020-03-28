import { Intent } from './Intent';
import produce from '../../helper/produce';
import { State } from '../../../../darwin-types/State';
import { UserContext } from '../../../../darwin-types/UserContext';
import { Unit, MAX_HEALTH } from '../../../../darwin-types/game-objects/Unit';
import { getObjectsOnField } from '../../helper/fields';
import { GAME_OBJECT_TYPES } from '../../../../darwin-types/game-objects/GameObject';
import { Food } from '../../../../darwin-types/game-objects/Food';
import { getUnit, removeGameObject } from '../../helper/gameObjects';

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
      const unit = getUnit(draft, userContext.unitId);
      if (!unit) {
        return;
      }
      const consumable = ConsumeIntent.getConsumableInReach(state, unit);
      const canConsume = !!consumable;

      if (canConsume) {
        unit.health = ConsumeIntent.heal(unit.health);
        const { objectIds, objectMap } = removeGameObject(draft, consumable.id);
        draft.objectMap = objectMap;
        draft.objectIds = objectIds;
      }
    });
  }
}
