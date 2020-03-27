import StateBuilder from '../../test-helper/StateBuilder';
import updateHealth from './unitUtils';
import { Unit } from '../../../../darwin-types/game-objects/Unit';

describe('UnitHealthState', () => {
  it('handles unit health state', () => {
    const state = StateBuilder.buildState()
      .addUnit({ id: 'test1', x: 1, y: 1, health: 100 })
      .build();

    const expectedState = StateBuilder.buildState()
      .addUnit({ id: 'test1', x: 1, y: 1, health: 90 })
      .build();

    const updatedState = updateHealth(state);
    const unitUpdated: Unit = updatedState.objectMap.test1 as Unit;
    const unitExpected: Unit = expectedState.objectMap.test1 as Unit;
    expect(unitUpdated.health).toBe(unitExpected.health);
  });

  it('Unit is removed from board', () => {
    const state = StateBuilder.buildState()
      .addUnit({ id: 'test1', x: 1, y: 1, health: 10 })
      .build();

    const updatedState = updateHealth(state);

    expect(Object.keys(updatedState.objectMap).length).toBe(0);
    expect(updatedState.objectIds.length).toBe(0);
  });
});
