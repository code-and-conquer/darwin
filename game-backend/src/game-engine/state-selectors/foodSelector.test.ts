import StateBuilder from '../../test-helper/StateBuilder';
import { getUnit } from '../../helper/gameObjects';
import { getNearestFood } from './foodSelector';
import { getConsumable } from '../../helper/consumables';

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
    const expectedNearestFood = getConsumable(state, FOOD_ID4);
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
