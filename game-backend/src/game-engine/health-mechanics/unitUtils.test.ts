import StateBuilder from '../../test-helper/StateBuilder';

describe('UnitHealthState', () => {
  it('handles unit health state', () => {
    // Todo kuntifer: get the health attribute from the unit
    const state = StateBuilder.buildState()
      .addUnit({ id: 'test1', x: 1, y: 1 })
      .build();

    const expectedState = StateBuilder.buildState()
      .addUnit({ id: 'test1', x: 1, y: 1 })
      .build();

    // expect(updateHealth(state)).toBe(expectedState);
  });
});
