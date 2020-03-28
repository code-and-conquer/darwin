import deepClone from './deepClone';

describe('deepClone', () => {
  it('should clone an object', () => {
    const state = {
      unit: {
        health: 95,
      },
    };

    const clonedState = deepClone(state);
    clonedState.unit.health = 100;
    expect(state.unit.health).toBe(95);
  });
});
