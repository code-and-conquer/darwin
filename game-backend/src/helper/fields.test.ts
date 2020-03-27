import StateBuilder from '../test-helper/StateBuilder';
import { State } from '../../../darwin-types/State';
import {
  getFreeFields,
  getFlatFieldArray,
  getOccupiedFieldMap,
  createKeyFromPosition,
} from './fields';
import { ARENA_HEIGHT, ARENA_WIDTH } from '../../../darwin-types/Arena';

const ARENA_SIZE = ARENA_HEIGHT * ARENA_WIDTH;

describe('getFlatFieldArray', () => {
  it('should return an array with areas dimension', () => {
    const fieldArray = getFlatFieldArray();
    expect(fieldArray.length).toEqual(ARENA_SIZE);
  });
});

describe('getOccupiedFieldMap', () => {
  it('should return an object containing occupied fields', () => {
    const unitId = 'UNIT_ID';
    const foodId = 'FOOD_ID';
    const state: State = StateBuilder.buildState()
      .addUnit({ id: unitId, x: 1, y: 1 })
      .addFood({ id: foodId, x: 2, y: 2 })
      .build();

    const unit = state.objectMap[unitId];
    const food = state.objectMap[foodId];

    const unitPosKey = createKeyFromPosition(unit.position);
    const foodPosKey = createKeyFromPosition(food.position);

    const occupiedFieldMap = getOccupiedFieldMap(state);
    expect(occupiedFieldMap[unitPosKey]).toBeTruthy();
    expect(occupiedFieldMap[unitPosKey]).toEqual(
      expect.arrayContaining([unit])
    );
    expect(occupiedFieldMap[foodPosKey]).toBeTruthy();
    expect(occupiedFieldMap[foodPosKey]).toEqual(
      expect.arrayContaining([food])
    );
    expect(occupiedFieldMap['1:2']).toBeFalsy();
  });
});

describe('getFreeFields', () => {
  it('should filter out occupied fields', () => {
    const state: State = StateBuilder.buildState()
      .addUnit({ id: 'UNIT_ID', x: 1, y: 1 })
      .addFood({ id: 'FOOD_1_ID', x: 2, y: 2 })
      .build();

    const freeFields = getFreeFields(state);

    expect(freeFields.length).toBe(ARENA_SIZE - 2);
    expect(freeFields).not.toEqual(
      expect.arrayContaining([
        { x: 1, y: 1 },
        { x: 2, y: 2 },
      ])
    );
    expect(freeFields).toEqual(expect.arrayContaining([{ x: 1, y: 2 }]));
  });
});
