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
  let userContext1: UserContext;
  let userContext2: UserContext;
  let userContext3: UserContext;

  let originalUnit1: Unit;
  let originalUnit2: Unit;
  let originalUnit3: Unit;

  beforeEach(() => {
    state = StateBuilder.buildState()
      .addUnit({ id: unitId1, x: 1, y: 1, health: 65 })
      .addFood({ id: foodId1, x: 1, y: 1 })
      .addUnit({ id: unitId2, x: 2, y: 2, health: 90 })
      .addFood({ id: foodId2, x: 2, y: 2 })
      .addUnit({ id: unitId3, x: 5, y: 5, health: 20 })
      .build();

    originalUnit1 = getUnit(state, unitId1);
    originalUnit2 = getUnit(state, unitId2);
    originalUnit3 = getUnit(state, unitId3);

    userContext1 = {
      unitId: unitId1,
    };
    userContext2 = {
      unitId: unitId2,
    };
    userContext3 = {
      unitId: unitId3,
    };
  });

  it('handles consume properly', () => {
    const intent = new ConsumeIntent();

    const newState = intent.execute(state, userContext1);
    const unit1 = getUnit(state, unitId1);
    const unit2 = getUnit(state, unitId2);

    const food1 = getFood(state, foodId1);
    const food2 = getFood(state, foodId2);

    expect(unit1.health).toBe(originalUnit1.health + FOOD_REGENERATION_VALUE);
    expect(unit2.health).toBe(originalUnit2.health);
    expect(food1).toBeFalsy();
    expect(food2).toBeTruthy();
    expect(newState.objectIds).not.toContain(foodId1);
    expect(newState.objectIds).toContain(foodId2);
  });

  it('respects max health value', () => {
    const intent = new ConsumeIntent();

    const newState = intent.execute(state, userContext2);
    const unit2 = getUnit(newState, unitId2);

    const food1 = getFood(newState, foodId1);
    const food2 = getFood(newState, foodId2);

    expect(unit2.health).toBe(MAX_HEALTH);
    expect(food1).toBeTruthy();
    expect(food2).toBeFalsy();
  });

  it('does not heal if no food is in reach', () => {
    const intent = new ConsumeIntent();

    const newState = intent.execute(state, userContext3);
    const unit3 = getUnit(newState, unitId3);

    expect(unit3.health).toBe(originalUnit3.health);
  });
});
