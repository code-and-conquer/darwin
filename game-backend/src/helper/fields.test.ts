import StateBuilder from '../test-helper/StateBuilder';
import { State } from '../../../darwin-types/State';
import {
  getFreeFields,
  getFlatFieldArray,
  getOccupiedFieldMap,
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
    const state: State = StateBuilder.buildState()
      .addUnit({ id: 'UNIT_ID', x: 1, y: 1 })
      .addFood({ id: 'FOOD_1_ID', x: 2, y: 2 })
      .build();

    const occupiedFieldMap = getOccupiedFieldMap(state);
    expect(occupiedFieldMap['1:1']).toBe(true);
    expect(occupiedFieldMap['2:2']).toBe(true);
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
