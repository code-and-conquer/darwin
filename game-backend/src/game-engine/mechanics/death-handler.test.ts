import { State } from '@darwin/types';
import StateBuilder from '../../test-helper/StateBuilder';
import handleDeath from './death-handler';
import { getUnit } from '../../helper/gameObjects';

describe('Death Handling', () => {
  const UNIT_ID = 'unit1';

  it('removes dead units', () => {
    const state: State = StateBuilder.buildState()
      .addUnit({ id: UNIT_ID, health: 0 })
      .build();

    const newState = handleDeath(state);

    expect(getUnit(newState, UNIT_ID)).toBeUndefined();
  });
});
