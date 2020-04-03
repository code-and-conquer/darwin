import { State } from '@darwin/types';
import handleFoodSpawning from './index';
import StateBuilder from '../../../test-helper/StateBuilder';

describe('Food Spawning', () => {
  const UNIT_ID = 'unit1';
  const FOOD_1_ID = 'food1';
  const FOOD_2_ID = 'food2';

  it('spawns a food object if there is space for it', () => {
    const state: State = StateBuilder.buildState()
      .addUnit({ id: UNIT_ID, x: 1, y: 1 })
      .addFood({ id: FOOD_1_ID, x: 2, y: 2 })
      .build();

    const newState = handleFoodSpawning(state);

    expect(newState.objectIds.length).toBe(3);
  });

  it('spawns no food object if there is no space for it', () => {
    const state: State = StateBuilder.buildState()
      .addUnit({ id: UNIT_ID, x: 1, y: 1 })
      .addFood({ id: FOOD_1_ID, x: 2, y: 2 })
      .addFood({ id: FOOD_2_ID, x: 3, y: 3 })
      .build();

    const newState = handleFoodSpawning(state);

    expect(newState.objectIds.length).toBe(3);
  });
});
