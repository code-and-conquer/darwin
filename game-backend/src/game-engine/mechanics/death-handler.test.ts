import { State } from '@darwin/types';
import StateBuilder from '../../test-helper/StateBuilder';
import { getUnit } from '../../helper/gameObjects';
import handleDeath from './death-handler';

describe('Death Handling', () => {
  const UNIT_ID1 = 'unit1';
  const UNIT_ID2 = 'unit2';

  it('removes dead units', () => {
    const state: State = StateBuilder.buildState()
      .addUnit({ id: UNIT_ID1, health: 0 })
      .addUnit({ id: UNIT_ID2, health: 1 })
      .build();

    const newState = handleDeath(state);
    const deadUnit = getUnit(newState, UNIT_ID1);
    const aliveUnit = getUnit(newState, UNIT_ID2);

    expect(deadUnit).toBeUndefined();
    expect(aliveUnit).toBeTruthy();
  });
});
