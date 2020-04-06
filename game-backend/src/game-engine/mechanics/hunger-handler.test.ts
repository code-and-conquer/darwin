import { MAX_HEALTH, State } from '@darwin/types';
import StateBuilder from '../../test-helper/StateBuilder';
import handleHunger, { HEALTH_LOSS_RATE } from './hunger-handler';
import { getUnit } from '../../helper/gameObjects';

describe('Hunger Handling', () => {
  const UNIT_ID = 'unit';
  const EMPOWERED_UNIT_ID = 'empowered_unit';
  const NERFED_UNIT_ID = 'nerfed_unit';
  const enduranceBoost = 2;
  const enduranceNerf = -2;

  it('decreases health', () => {
    const state: State = StateBuilder.buildState()
      .addUnit({ id: UNIT_ID, x: 1, y: 1, health: MAX_HEALTH })
      .addUnit({
        id: EMPOWERED_UNIT_ID,
        x: 1,
        y: 1,
        health: MAX_HEALTH,
        attributes: { enduranceBoost },
      })
      .addUnit({
        id: NERFED_UNIT_ID,
        x: 1,
        y: 1,
        health: MAX_HEALTH,
        attributes: { enduranceBoost: enduranceNerf },
      })
      .build();

    const newState = handleHunger(state);

    expect(getUnit(newState, UNIT_ID).health).toBe(
      MAX_HEALTH - HEALTH_LOSS_RATE
    );
    expect(getUnit(newState, EMPOWERED_UNIT_ID).health).toBe(
      MAX_HEALTH - (HEALTH_LOSS_RATE - enduranceBoost)
    );
    expect(getUnit(newState, NERFED_UNIT_ID).health).toBe(
      MAX_HEALTH - (HEALTH_LOSS_RATE - enduranceNerf)
    );
  });
});
