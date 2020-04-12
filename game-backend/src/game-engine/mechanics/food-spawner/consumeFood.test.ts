import { State, UserContext, MAX_HEALTH } from '@darwin/types';
import consumeFood from './consumeFood';
import StateBuilder from '../../../test-helper/StateBuilder';
import { getUnit } from '../../../helper/gameObjects';
import { getConsumable } from '../../../helper/consumable';

describe('food consumption', () => {
  const NORMAL_UNIT_ID = 'unit1';
  const MAXED_UNIT_ID = 'unit2';
  const BOOSTED_UNIT_ID = 'unit3';
  const FOOD_ID = 'food1';

  const normalUserContext: UserContext = {
    unitId: NORMAL_UNIT_ID,
  };
  const maxedUserContext: UserContext = {
    unitId: MAXED_UNIT_ID,
  };
  const boostedUserContext: UserContext = {
    unitId: BOOSTED_UNIT_ID,
  };

  const state: State = StateBuilder.buildState()
    .addUnit({
      id: NORMAL_UNIT_ID,
      x: 1,
      y: 1,
      health: 20,
    })
    .addUnit({
      id: MAXED_UNIT_ID,
      x: 2,
      y: 2,
      health: MAX_HEALTH,
    })
    .addUnit({
      id: BOOSTED_UNIT_ID,
      x: 4,
      y: 4,
      health: 20,
      attributes: {
        healthRegenBoost: 10,
      },
    })
    .addFood({
      id: FOOD_ID,
      x: 3,
      y: 3,
    })
    .build();

  it('should restore health', () => {
    const newState = consumeFood(FOOD_ID, state, normalUserContext);

    const unit = getUnit(newState, NORMAL_UNIT_ID);

    expect(unit.health).toBe(40);
  });

  it('should respect max health', () => {
    const newState = consumeFood(FOOD_ID, state, maxedUserContext);

    const unit = getUnit(newState, MAXED_UNIT_ID);

    expect(unit.health).toBe(MAX_HEALTH);
  });

  it('should remove food after consumption', () => {
    const newState = consumeFood(FOOD_ID, state, normalUserContext);

    const food = getConsumable(newState, FOOD_ID);

    expect(food).toBeUndefined();
    expect(newState.objectIds).not.toContain(FOOD_ID);
  });

  it('should restore more health if healthRegenBoost is active', () => {
    const newState = consumeFood(FOOD_ID, state, boostedUserContext);

    const unit = getUnit(newState, BOOSTED_UNIT_ID);

    expect(unit.health).toBe(50);
  });
});
