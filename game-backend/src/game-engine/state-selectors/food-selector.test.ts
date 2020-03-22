import StateBuilder from '../../test-helper/StateBuilder';
import { State } from '../../../../darwin-types/State';
import selectFoods from './food-selector';
import { GAME_OBJECT_TYPES } from '../../../../darwin-types/game-objects/GameObject';

describe('selectFoods', () => {
  const FOOD_ID = 'FOODID1';
  const UNIT_ID = 'unit1';
  const multipleFoodCount = 10;
  let oneFoodState: State;
  let zeroFoodState: State;
  let multipleFoodState: State;
  let multipleFoodStateBuilder: StateBuilder;

  beforeEach(() => {
    oneFoodState = StateBuilder.buildState()
      .addFood({ id: FOOD_ID, x: 5, y: 17 })
      .addUnit({ id: UNIT_ID, x: 2, y: 10 })
      .build();
    zeroFoodState = StateBuilder.buildState().build();

    multipleFoodStateBuilder = StateBuilder.buildState().addUnit({
      id: UNIT_ID,
      x: 2,
      y: 10,
    });
    for (let i = 1; i <= multipleFoodCount; i++) {
      multipleFoodStateBuilder.addFood({ id: `Food_${i}`, x: i, y: i });
    }
    multipleFoodState = multipleFoodStateBuilder.build();
  });

  it('filters state with zero food', () => {
    const foods = selectFoods(zeroFoodState);

    expect(foods.length).toBe(0);
  });

  it('filters state with one food', () => {
    const foods = selectFoods(oneFoodState);

    expect(foods.length).toBe(1);
    expect(foods[0].type).toBe(GAME_OBJECT_TYPES.FOOD);
    expect(foods[0].position.x).toBe(5);
    expect(foods[0].position.y).toBe(17);
  });

  it('filters state with multiple foods', () => {
    const foods = selectFoods(multipleFoodState);

    expect(foods.length).toBe(multipleFoodCount);
    for (let i = 0; i < multipleFoodCount; i++) {
      expect(foods[i].type).toBe(GAME_OBJECT_TYPES.FOOD);
    }
  });
});
