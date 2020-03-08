import MoveIntent, { Direction } from './MoveIntent';

describe('MoveIntent', () => {
  it('handles move properly', () => {
    const intent = new MoveIntent(Direction.Down);

    const newState = intent.execute(
      {
        objectMap: {
          unit1: {
            id: 'unit1',
            position: {
              x: 0,
              y: 0,
            },
          },
        },
        objectIds: ['unit1'],
      },
      {
        unitId: 'unit1',
      }
    );
    expect(newState.objectMap.unit1.position.x).toBe(1);
  });
});
