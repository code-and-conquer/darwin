import { GameObjectTypes } from '@darwin/types';
import StateBuilder from '../../test-helper/StateBuilder';
import { getUnit } from '../../helper/gameObjects';
import { getNearestPowerup } from './powerupSelector';
import { getConsumable } from '../../helper/consumable';

describe('getNearestPowerup', () => {
  it('should get nearest powerup resource', () => {
    const UNIT_ID = 'UNIT_ID';
    const POWERUP_ID1 = 'POWERUP_ID1';
    const POWERUP_ID2 = 'POWERUP_ID2';
    const POWERUP_ID3 = 'POWERUP_ID3';
    const POWERUP_ID4 = 'POWERUP_ID4';
    const state = StateBuilder.buildState()
      .addPowerup({
        id: POWERUP_ID1,
        x: 5,
        y: 17,
        type: GameObjectTypes.EnduranceBoost,
      })
      .addPowerup({
        id: POWERUP_ID2,
        x: 5,
        y: 12,
        type: GameObjectTypes.EnduranceBoost,
      })
      .addPowerup({
        id: POWERUP_ID3,
        x: 15,
        y: 17,
        type: GameObjectTypes.EnduranceBoost,
      })
      .addPowerup({
        id: POWERUP_ID4,
        x: 4,
        y: 11,
        type: GameObjectTypes.EnduranceBoost,
      })
      .addUnit({ id: UNIT_ID, x: 2, y: 10 })
      .build();

    const unit = getUnit(state, UNIT_ID);
    const expectedNearestPowerup = getConsumable(state, POWERUP_ID4);
    const powerup = getNearestPowerup(state, unit);
    expect(powerup).toBe(expectedNearestPowerup);
  });
  it('should not fail, if no powerup is available', () => {
    const UNIT_ID = 'UNIT_ID';
    const state = StateBuilder.buildState()
      .addUnit({ id: UNIT_ID, x: 2, y: 10 })
      .build();

    const unit = getUnit(state, UNIT_ID);
    const powerup = getNearestPowerup(state, unit);
    expect(powerup).toBeFalsy();
  });
});
