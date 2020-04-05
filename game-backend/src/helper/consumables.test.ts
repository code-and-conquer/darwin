import StateBuilder from '../test-helper/StateBuilder';
import { getConsumablesFromState } from './consumables';
import { ATTRIBUTES } from '../../../darwin-types/src/game-objects/Unit';

describe('getConsumablesFromState', () => {
  it('should return only consumables', () => {
    const UNIT_ID = 'UNIT_ID';
    const FOOD_ID = 'FOOD_ID';
    const POWER_UP_ID = 'POWER_UP_ID';
    const state = StateBuilder.buildState()
      .addFood({ id: FOOD_ID, x: 5, y: 17 })
      .addUnit({ id: UNIT_ID, x: 2, y: 10 })
      .addPowerUp({
        id: POWER_UP_ID,
        x: 2,
        y: 11,
        subType: ATTRIBUTES.ENDURANCE_BOOST,
      })
      .build();

    const consumables = getConsumablesFromState(state);
    consumables.forEach(consumable => {
      expect(consumable.isConsumable).toBe(true);
    });
  });
});
