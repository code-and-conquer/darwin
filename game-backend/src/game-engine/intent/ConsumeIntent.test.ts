import ConsumeIntent, { FOOD_REGENERATION_VALUE } from './ConsumeIntent';
import StateBuilder from '../../test-helper/StateBuilder';
import { State } from '../../../../darwin-types/State';
import { UserContext } from '../../../../darwin-types/UserContext';
import { Unit, MAX_HEALTH } from '../../../../darwin-types/game-objects/Unit';
import { getUnit, getFood } from '../../helper/gameObjects';

describe('ConsumeIntent', () => {
  const unitId1 = 'UNIT_ID_1';
  const unitId2 = 'UNIT_ID_2';
  const unitId3 = 'UNIT_ID_3';
  const foodId1 = 'FOOD_ID_1';
  const foodId2 = 'FOOD_ID_2';

  let state: State;
  let lowHealth: UserContext;
  let overflowHealth: UserContext;
  let noReachableFood: UserContext;

  let lowHealthUnit: Unit;
  let overflowHealthUnit: Unit;
  let noReachableFoodUnit: Unit;

  beforeEach(() => {
    state = StateBuilder.buildState()
      .addUnit({ id: unitId1, x: 1, y: 1, health: 65 })
      .addFood({ id: foodId1, x: 1, y: 1 })
      .addUnit({ id: unitId2, x: 2, y: 2, health: 90 })
      .addFood({ id: foodId2, x: 2, y: 2 })
      .addUnit({ id: unitId3, x: 5, y: 5, health: 20 })
      .build();

    lowHealthUnit = getUnit(state, unitId1);
    overflowHealthUnit = getUnit(state, unitId2);
    noReachableFoodUnit = getUnit(state, unitId3);

    lowHealth = {
      unitId: unitId1,
    };
    overflowHealth = {
      unitId: unitId2,
    };
    noReachableFood = {
      unitId: unitId3,
    };
  });

  it('handles consume properly', () => {
    const intent = new ConsumeIntent();

    const newState = intent.execute(state, lowHealth);
    const unit1 = getUnit(newState, unitId1);
    const unit2 = getUnit(newState, unitId2);

    const food1 = getFood(newState, foodId1);
    const food2 = getFood(newState, foodId2);

    expect(unit1.health).toBe(lowHealthUnit.health + FOOD_REGENERATION_VALUE);
    expect(unit2.health).toBe(overflowHealthUnit.health);
    expect(food1).toBeFalsy();
    expect(food2).toBeTruthy();
    expect(newState.objectIds).not.toContain(foodId1);
    expect(newState.objectIds).toContain(foodId2);
  });

  it('respects max health value', () => {
    const intent = new ConsumeIntent();

    const newState = intent.execute(state, overflowHealth);
    const unit2 = getUnit(newState, unitId2);

    expect(unit2.health).toBe(MAX_HEALTH);
  });

  it('does not heal if no food is in reach', () => {
    const intent = new ConsumeIntent();

    const newState = intent.execute(state, noReachableFood);
    const unit3 = getUnit(newState, unitId3);

    expect(unit3.health).toBe(noReachableFoodUnit.health);
  });
});
