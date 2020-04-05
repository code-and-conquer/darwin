import { State, ATTRIBUTES } from '@darwin/types';
import handlePowerUpSpawning from './index';
import StateBuilder from '../../../test-helper/StateBuilder';

describe('PowerUp Spawning', () => {
  const UNIT_1_ID = 'unit1';
  const UNIT_2_ID = 'unit2';
  const POWER_UP_1_ID = 'powerUp1';

  it('spawns a powerup object if there is space for it', () => {
    const state: State = StateBuilder.buildState()
      .addUnit({ id: UNIT_1_ID, x: 1, y: 1 })
      .addUnit({ id: UNIT_2_ID, x: 2, y: 2 })
      .build();

    const newState = handlePowerUpSpawning(state);

    expect(newState.objectIds.length).toBe(3);
  });

  it('spawns no powerup object if there is no space for it', () => {
    const state: State = StateBuilder.buildState()
      .addUnit({ id: UNIT_1_ID, x: 1, y: 1 })
      .addPowerUp({
        id: POWER_UP_1_ID,
        x: 2,
        y: 2,
        subType: ATTRIBUTES.ENDURANCE_BOOST,
      })
      .build();

    const newState = handlePowerUpSpawning(state);

    expect(newState.objectIds.length).toBe(2);
  });
});
