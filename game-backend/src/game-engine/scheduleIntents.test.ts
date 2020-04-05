import { State } from '@darwin/types';
import scheduleIntents from './scheduleIntents';
import StateBuilder from '../test-helper/StateBuilder';
import { getUnit } from '../helper/gameObjects';
import MoveIntent, { Direction } from './intent/MoveIntent';
import { getConsumable } from '../helper/consumables';

describe('scheduleIntents', () => {
  const getDummyState = (): State => ({
    objectMap: {},
    objectIds: [],
  });
  it('returns state of a given intent', () => {
    const mockExecute = jest.fn();
    const state = getDummyState();
    mockExecute.mockReturnValueOnce(state);
    const newState = scheduleIntents(getDummyState(), [
      {
        context: {
          userScript: {
            script: '',
          },
          unitId: '',
        },
        intents: [
          {
            execute: mockExecute,
          },
        ],
      },
    ]);

    expect(newState).toBe(state);
  });

  it('makes sure no state objects gets mutated', () => {
    const UNIT_ID = 'UNIT_ID';
    const FOOD_ID = 'FOOD_ID';
    const state = StateBuilder.buildState()
      .addUnit({ id: UNIT_ID, x: 1 })
      .addFood({ id: FOOD_ID, x: 10 })
      .build();
    const newState = scheduleIntents(state, [
      {
        context: {
          userScript: {
            script: `
                userUnit.position.x = 8;
                nearestFood.position.x = 8;
                move('RIGHT')
              `,
          },
          unitId: UNIT_ID,
        },
        intents: [new MoveIntent(Direction.Right)],
      },
    ]);

    const unit = getUnit(newState, UNIT_ID);
    const food = getConsumable(newState, FOOD_ID);

    expect(unit.position.x).toBe(2);
    expect(food.position.x).toBe(10);
  });
});
