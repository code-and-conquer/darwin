import { ARENA_HEIGHT, ARENA_WIDTH, State } from '@darwin/types';
import StateBuilder from '../test-helper/StateBuilder';
import {
  getFreeFields,
  getFlatFieldArray,
  getOccupiedFieldMap,
  createKeyFromPosition,
  getObjectsOnField,
} from './fields';

const ARENA_SIZE = ARENA_HEIGHT * ARENA_WIDTH;

describe('getFlatFieldArray', () => {
  it('should return an array with areas dimension', () => {
    const fieldArray = getFlatFieldArray();
    expect(fieldArray.length).toEqual(ARENA_SIZE);
  });
});

describe('getObjectsOnField', () => {
  it('should return an array with objects on given position', () => {
    const unitId = 'UNIT_ID';
    const foodId1 = 'FOOD_ID_1';
    const foodId2 = 'FOOD_ID_2';
    const state: State = StateBuilder.buildState()
      .addUnit({ id: unitId, x: 1, y: 1 })
      .addFood({ id: foodId1, x: 2, y: 2 })
      .addFood({ id: foodId2, x: 1, y: 1 })
      .build();

    const unit = state.objectMap[unitId];
    const food1 = state.objectMap[foodId1];
    const food2 = state.objectMap[foodId2];

    const objectsOnFieldOneOne = getObjectsOnField(state, { x: 1, y: 1 });
    const objectsOnFieldTwoTwo = getObjectsOnField(state, { x: 2, y: 2 });
    const objectsOnEmptyField = getObjectsOnField(state, { x: 3, y: 3 });

    expect(objectsOnEmptyField.length).toBe(0);

    expect(objectsOnFieldOneOne.length).toEqual(2);
    expect(objectsOnFieldOneOne).toEqual(expect.arrayContaining([unit, food2]));
    expect(objectsOnFieldOneOne).toEqual(expect.not.arrayContaining([food1]));

    expect(objectsOnFieldTwoTwo.length).toEqual(1);
    expect(objectsOnFieldTwoTwo).toEqual(
      expect.not.arrayContaining([unit, food2])
    );
    expect(objectsOnFieldTwoTwo).toEqual(expect.arrayContaining([food1]));
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
