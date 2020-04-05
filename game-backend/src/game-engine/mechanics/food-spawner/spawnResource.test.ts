import { State } from '@darwin/types';
import handleResourceSpawning from './index';
import StateBuilder from '../../../test-helper/StateBuilder';

describe('Resource Spawning', () => {
  const UNIT_ID = 'unit1';
  const RESOURCE_1_ID = 'resource1';
  const RESOURCE_2_ID = 'resource2';

  it('spawns a resource object if there is space for it', () => {
    const state: State = StateBuilder.buildState()
      .addUnit({ id: UNIT_ID, x: 1, y: 1 })
      .addFood({ id: RESOURCE_1_ID, x: 2, y: 2 })
      .build();

    const newState = handleResourceSpawning(state);

    expect(newState.objectIds.length).toBe(3);
  });

  it('spawns no resource object if there is no space for it', () => {
    const state: State = StateBuilder.buildState()
      .addUnit({ id: UNIT_ID, x: 1, y: 1 })
      .addFood({ id: RESOURCE_1_ID, x: 2, y: 2 })
      .addFood({ id: RESOURCE_2_ID, x: 3, y: 3 })
      .build();

    const newState = handleResourceSpawning(state);

    expect(newState.objectIds.length).toBe(3);
  });
});
