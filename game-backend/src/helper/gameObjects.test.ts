import StateBuilder from '../test-helper/StateBuilder';
import { State } from '../../../darwin-types/State';
import { GAME_OBJECT_TYPES } from '../../../darwin-types/game-objects/GameObject';
import {
  getFood,
  getGameObjectsPerType,
  removeGameObject,
  getNearestFood,
  getUnit,
} from './gameObjects';

describe('getGameObjectsPerType', () => {
  const FOOD_ID = 'FOODID1';
  const UNIT_ID = 'unit1';
  const multipleObjectsCount = 5;
  let emptyState: State;
  let oneObjectOfEachState: State;
  let multipleObjectState: State;
  let multipleObjectStateBuilder: StateBuilder;

  beforeEach(() => {
    oneObjectOfEachState = StateBuilder.buildState()
      .addFood({ id: FOOD_ID, x: 5, y: 17 })
      .addUnit({ id: UNIT_ID, x: 2, y: 10 })
      .build();

    multipleObjectStateBuilder = StateBuilder.buildState();
    for (let i = 1; i <= multipleObjectsCount; i++) {
      multipleObjectStateBuilder.addFood({ id: `Food_${i}`, x: i, y: i });
      multipleObjectStateBuilder.addUnit({
        id: `Unit_${i}`,
        x: i + 1,
        y: i + 1,
      });
    }
    multipleObjectState = multipleObjectStateBuilder.build();

    emptyState = StateBuilder.buildState().build();
  });

  it('filters state with zero food', () => {
    const foods = getGameObjectsPerType(emptyState, GAME_OBJECT_TYPES.FOOD);

    expect(foods.length).toBe(0);
  });

  it('filters state with one food', () => {
    const foods = getGameObjectsPerType(
      oneObjectOfEachState,
      GAME_OBJECT_TYPES.FOOD
    );

    expect(foods.length).toBe(1);
    expect(foods[0].type).toBe(GAME_OBJECT_TYPES.FOOD);
    expect(foods[0].position.x).toBe(5);
    expect(foods[0].position.y).toBe(17);
  });

  it('filters state with one unit', () => {
    const units = getGameObjectsPerType(
      oneObjectOfEachState,
      GAME_OBJECT_TYPES.UNIT
    );

    expect(units.length).toBe(1);
    expect(units[0].type).toBe(GAME_OBJECT_TYPES.UNIT);
    expect(units[0].position.x).toBe(2);
    expect(units[0].position.y).toBe(10);
  });

  it('filters state with multiple foods and other objects', () => {
    const foods = getGameObjectsPerType(
      multipleObjectState,
      GAME_OBJECT_TYPES.FOOD
    );

    expect(foods.length).toBe(multipleObjectsCount);
    for (let i = 0; i < multipleObjectsCount; i++) {
      expect(foods[i].type).toBe(GAME_OBJECT_TYPES.FOOD);
    }
  });
});

describe('removeGameObject', () => {
  it('should remove the object by the given id', () => {
    const UNIT_ID = 'UNIT_ID';
    const FOOD_ID = 'FOOD_ID';
    const state = StateBuilder.buildState()
      .addFood({ id: FOOD_ID, x: 5, y: 17 })
      .addUnit({ id: UNIT_ID, x: 2, y: 10 })
      .build();

    const newState = removeGameObject(state, UNIT_ID);
    expect(newState.objectIds).not.toContain(UNIT_ID);
    expect(newState.objectMap[UNIT_ID]).toBeFalsy();
    expect(newState.objectMap[FOOD_ID]).toBeTruthy();
  });
});

describe('getNearestFood', () => {
  it('should get nearest food resource', () => {
    const UNIT_ID = 'UNIT_ID';
    const FOOD_ID1 = 'FOOD_ID1';
    const FOOD_ID2 = 'FOOD_ID2';
    const FOOD_ID3 = 'FOOD_ID3';
    const FOOD_ID4 = 'FOOD_ID4';
    const state = StateBuilder.buildState()
      .addFood({ id: FOOD_ID1, x: 5, y: 17 })
      .addFood({ id: FOOD_ID2, x: 5, y: 12 })
      .addFood({ id: FOOD_ID3, x: 15, y: 17 })
      .addFood({ id: FOOD_ID4, x: 4, y: 11 })
      .addUnit({ id: UNIT_ID, x: 2, y: 10 })
      .build();

    const unit = getUnit(state, UNIT_ID);
    const expectedNearestFood = getFood(state, FOOD_ID4);
    const food = getNearestFood(state, unit);
    expect(food).toBe(expectedNearestFood);
  });
  it('should not fail, if no food is available', () => {
    const UNIT_ID = 'UNIT_ID';
    const state = StateBuilder.buildState()
      .addUnit({ id: UNIT_ID, x: 2, y: 10 })
      .build();

    const unit = getUnit(state, UNIT_ID);
    const food = getNearestFood(state, unit);
    expect(food).toBeFalsy();
  });
});
