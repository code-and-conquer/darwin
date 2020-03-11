import MoveIntent, { Direction } from './MoveIntent';
import StateBuilder from '../../test-helper/StateBuilder';
import { ARENA_HEIGHT } from '../../../../darwin-types/Arena';

describe('MoveIntent', () => {
  it('handles move properly', () => {
    const intent = new MoveIntent(Direction.Down);

    const newState = intent.execute(
      StateBuilder.buildState()
        .addObject({ id: 'unit1', x: 0, y: 0 })
        .build(),
      {
        unitId: 'unit1',
      }
    );
    expect(newState.objectMap.unit1.position.y).toBe(1);
  });

  it('handles position conflicts properly', () => {
    const intent = new MoveIntent(Direction.Down);

    const newState = intent.execute(
      StateBuilder.buildState()
        .addObject({ id: 'unit1', x: 0, y: 0 })
        .addObject({ id: 'unit2', x: 0, y: 1 })
        .build(),
      {
        unitId: 'unit1',
      }
    );
    expect(newState.objectMap.unit1.position.y).toBe(0);
    expect(newState.objectMap.unit2.position.y).toBe(1);
  });

  it('handles lower system boundaries', () => {
    const intent = new MoveIntent(Direction.Up);

    const newState = intent.execute(
      StateBuilder.buildState()
        .addObject({ id: 'unit1', x: 0, y: 0 })
        .build(),
      {
        unitId: 'unit1',
      }
    );
    expect(newState.objectMap.unit1.position.y).toBe(0);
  });

  it('handles upper system boundaries', () => {
    const intent = new MoveIntent(Direction.Down);

    const newState = intent.execute(
      StateBuilder.buildState()
        .addObject({ id: 'unit1', x: 0, y: ARENA_HEIGHT })
        .build(),
      {
        unitId: 'unit1',
      }
    );
    expect(newState.objectMap.unit1.position.y).toBe(ARENA_HEIGHT);
  });
});
