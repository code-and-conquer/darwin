import StateBuilder from '../../test-helper/StateBuilder';
import { Unit } from '../../../../darwin-types/game-objects/Unit';
import { updateHealth } from './index';

describe('UnitHealthState', () => {
  it('handles unit health state', () => {
    const state = StateBuilder.buildState()
      .addUnit({ id: 'test1', x: 1, y: 1, health: 100 })
      .build();

    const updatedState = updateHealth(state);
    const unitUpdated: Unit = updatedState.objectMap.test1 as Unit;
    expect(unitUpdated.health).toBe(95);
  });

  it('Unit is removed from board', () => {
    const state = StateBuilder.buildState()
      .addUnit({ id: 'test1', x: 1, y: 1, health: 5 })
      .build();

    const updatedState = updateHealth(state);

    expect(Object.keys(updatedState.objectMap).length).toBe(0);
    expect(updatedState.objectIds.length).toBe(0);
  });
});
