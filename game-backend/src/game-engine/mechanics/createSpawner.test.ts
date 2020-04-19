import { Position, GameObject, State } from '@darwin/types';
import createSpawner from './createSpawner';
import { createFood } from '../../helper/gameObjects';
import StateBuilder from '../../test-helper/StateBuilder';

const mockSpawn = (position: Position): GameObject =>
  createFood({ id: 'food', position });

const mockCount = (state: State): number => state.objectIds.length;
const mockHighLimit = (state: State): number => state.objectIds.length * 2;
const mockLowLimit = (state: State): number => state.objectIds.length * 0;

const state = StateBuilder.buildState()
  .addUnit({ id: 'unit', x: 0, y: 0 })
  .build();

describe('createSpawner', () => {
  it('should spawn an object if there is space', () => {
    const spawner = createSpawner({
      limit: mockHighLimit,
      count: mockCount,
      spawn: mockSpawn,
    });

    const newState = spawner(state);
    expect(newState.objectIds.length).toBe(2);
  });

  it('should not spawn an object if there is no space', () => {
    const spawner = createSpawner({
      limit: mockLowLimit,
      count: mockCount,
      spawn: mockSpawn,
    });

    const newState = spawner(state);
    expect(newState.objectIds.length).toBe(1);
  });
});
