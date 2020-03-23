import StateBuilder from '../test-helper/StateBuilder';
import { State } from '../../../darwin-types/State';
import { GAME_OBJECT_TYPES } from '../../../darwin-types/game-objects/GameObject';
import { getGameObjectsPerType } from './gameObjects';

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