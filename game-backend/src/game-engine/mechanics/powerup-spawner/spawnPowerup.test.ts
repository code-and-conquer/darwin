import { State } from '@darwin/types';
import handlePowerupSpawning from './index';
import StateBuilder from '../../../test-helper/StateBuilder';

describe('Food Spawning', () => {
  const UNIT_ID1 = 'unit1';
  const UNIT_ID2 = 'unit2';

  it('spawns a powerup object if there is space for it', () => {
    const state: State = StateBuilder.buildState()
      .addUnit({ id: UNIT_ID1, x: 1, y: 1 })
      .addUnit({ id: UNIT_ID2, x: 2, y: 2 })
      .build();

    const newState = handlePowerupSpawning(state);

    expect(newState.objectIds.length).toBe(3);
  });

  it('spawns no powerup object if there is no space for it', () => {
    const state: State = StateBuilder.buildState()
      .addUnit({ id: UNIT_ID1, x: 1, y: 1 })
      .build();

    const newState = handlePowerupSpawning(state);

    expect(newState.objectIds.length).toBe(1);
  });
});
