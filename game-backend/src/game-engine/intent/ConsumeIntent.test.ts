import {
  MAX_HEALTH,
  State,
  Unit,
  UserContext,
  ATTRIBUTES,
} from '@darwin/types';
import ConsumeIntent from './ConsumeIntent';
import StateBuilder from '../../test-helper/StateBuilder';
import { getUnit, getFood, getPowerUp } from '../../helper/gameObjects';
import { FOOD_REGENERATION_VALUE } from '../mechanics/food-spawner/createFood';

describe('ConsumeIntent on Food', () => {
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

  it('handles food consume properly', () => {
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

  it('handles dead units', () => {
    const intent = new ConsumeIntent();

    const emptyState = StateBuilder.buildState().build();
    const newState = intent.execute(emptyState, lowHealth);

    expect(newState).toBe(emptyState);
  });
});

describe('ConsumeIntent on Powerup', () => {
  const unitId1 = 'UNIT_ID_1';
  const unitId2 = 'UNIT_ID_2';
  const powerUpId1 = 'POWER_UP_ID_1';
  const powerUpId2 = 'POWER_UP_ID_2';

  let state: State;
  let normalContext: UserContext;
  let maxedContext: UserContext;

  beforeEach(() => {
    state = StateBuilder.buildState()
      .addUnit({ id: unitId1, x: 1, y: 1 })
      .addPowerUp({
        id: powerUpId1,
        x: 1,
        y: 1,
        subType: ATTRIBUTES.ENDURANCE_BOOST,
      })
      .addUnit({
        id: unitId2,
        x: 2,
        y: 2,
        attributes: { [ATTRIBUTES.ENDURANCE_BOOST]: 2 },
      })
      .addPowerUp({
        id: powerUpId2,
        x: 2,
        y: 2,
        subType: ATTRIBUTES.ENDURANCE_BOOST,
      })
      .build();

    normalContext = {
      unitId: unitId1,
    };
    maxedContext = {
      unitId: unitId2,
    };
  });

  it('handles powerup consume properly', () => {
    const intent = new ConsumeIntent();

    const newState = intent.execute(state, normalContext);
    const unit1 = getUnit(newState, unitId1);
    const powerup1 = getPowerUp(newState, powerUpId1);

    expect(unit1.attributes[ATTRIBUTES.ENDURANCE_BOOST]).toBe(1);
    expect(powerup1).toBeFalsy();
    expect(newState.objectIds).not.toContain(powerup1);
  });
  it('respects attributes max value', () => {
    const intent = new ConsumeIntent();

    const newState = intent.execute(state, maxedContext);
    const maxedUnit = getUnit(newState, unitId2);
    const powerUp2 = getPowerUp(newState, powerUpId2);

    expect(maxedUnit.attributes[ATTRIBUTES.ENDURANCE_BOOST]).toBe(2);
    expect(powerUp2).toBeTruthy();
    expect(newState.objectIds).toContain(powerUpId2);
  });
});
