import { State } from '../../../../darwin-types/State';
import StateBuilder from '../../test-helper/StateBuilder';
import handleHunger, { HEALTH_LOSS_RATE } from './hunger-handler';
import { getUnit } from '../../helper/gameObjects';
import { MAX_HEALTH } from '../../../../darwin-types/game-objects/Unit';

describe('Hunger Handling', () => {
  const UNIT_ID = 'unit1';

  it('decreases health', () => {
    const state: State = StateBuilder.buildState()
      .addUnit({ id: UNIT_ID, x: 1, y: 1, health: MAX_HEALTH })
      .build();

    const newState = handleHunger(state);

    expect(getUnit(newState, UNIT_ID).health).toBe(
      MAX_HEALTH - HEALTH_LOSS_RATE
    );
  });

  it('removes dead units', () => {
    const state: State = StateBuilder.buildState()
      .addUnit({ id: UNIT_ID, health: HEALTH_LOSS_RATE })
      .build();

    const newState = handleHunger(state);

    expect(getUnit(newState, UNIT_ID)).toBeUndefined();
  });
});
