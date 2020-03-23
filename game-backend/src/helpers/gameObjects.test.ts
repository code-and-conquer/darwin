import { getFreeFields } from './gameObjects';
import StateBuilder from '../test-helper/StateBuilder';
import { State } from '../../../darwin-types/State';
import { ARENA_HEIGHT, ARENA_WIDTH } from '../../../darwin-types/Arena';

describe('Food Spawning', () => {
  const UNIT_ID = 'unit1';
  const FOOD_1_ID = 'food1';

  it('it should filter out occupied fields', () => {
    const state: State = StateBuilder.buildState()
      .addUnit({ id: UNIT_ID, x: 1, y: 1 })
      .addFood({ id: FOOD_1_ID, x: 2, y: 2 })
      .build();

    const freeFields = getFreeFields(state);

    expect(freeFields.length).toBe(ARENA_HEIGHT * ARENA_WIDTH - 2);
    expect(freeFields).not.toEqual(
      expect.arrayContaining([
        { x: 1, y: 1 },
        { x: 2, y: 2 },
      ])
    );
    expect(freeFields).toEqual(expect.arrayContaining([{ x: 1, y: 2 }]));
  });
});
