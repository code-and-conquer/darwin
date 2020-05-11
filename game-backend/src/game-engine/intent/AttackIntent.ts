import { State, UserContext, Unit, ObjectId } from '@darwin/types';
import { Intent } from './Intent';
import { getUnit, removeGameObject } from '../../helper/gameObjects';
import produce from '../../helper/produce';

export const ATTACK_RANGE = 1;
export const HIT_DAMAGE = 16;

/**
 * Represents the intent to attack an enemy.
 */
export default class AttackIntent implements Intent {
  cost = 2;

  private targetUnitId: ObjectId;

  constructor(targetUnit: Unit) {
    this.targetUnitId = targetUnit.id;
  }

  private static isTargetInReach(unit: Unit, targetUnit: Unit): boolean {
    const xDiff = Math.abs(unit.position.x - targetUnit.position.x);
    const yDiff = Math.abs(unit.position.y - targetUnit.position.y);
    const diff = Math.sqrt(xDiff ** 2 + yDiff ** 2);

    return diff <= ATTACK_RANGE;
  }

  private static attack(targetUnit: Unit, state: State): State {
    return produce(state, draft => {
      const defendingUnit = getUnit(draft, targetUnit.id);
      defendingUnit.health -= HIT_DAMAGE;
      if (defendingUnit.health <= 0) {
        const { objectIds, objectMap } = removeGameObject(
          draft,
          defendingUnit.id
        );
        draft.objectMap = objectMap;
        draft.objectIds = objectIds;
      }
    });
  }

  execute(state: State, userContext: UserContext): State {
    const unit = getUnit(state, userContext.unitId);
    const targetUnit = getUnit(state, this.targetUnitId);

    if (!unit || !targetUnit) {
      return state;
    }
    const canAttack = AttackIntent.isTargetInReach(unit, targetUnit);

    return canAttack ? AttackIntent.attack(targetUnit, state) : state;
  }
}
