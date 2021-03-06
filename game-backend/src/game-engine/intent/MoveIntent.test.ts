import { ARENA_HEIGHT, ARENA_WIDTH, State, UserContext } from '@darwin/types';
import MoveIntent, { Direction } from './MoveIntent';
import StateBuilder from '../../test-helper/StateBuilder';

import ConsumeIntent from './ConsumeIntent';

describe('MoveIntent', () => {
  const UNIT_ID = 'unit1';
  let neutralPositionState: State;
  let lowerPositionState: State;
  let upperPositionState: State;
  let baseUserContext: UserContext;

  beforeEach(() => {
    neutralPositionState = StateBuilder.buildState()
      .addUnit({ id: UNIT_ID, x: 1, y: 1 })
      .build();
    lowerPositionState = StateBuilder.buildState()
      .addUnit({ id: UNIT_ID, x: 0, y: 0 })
      .build();
    upperPositionState = StateBuilder.buildState()
      .addUnit({ id: UNIT_ID, x: ARENA_WIDTH - 1, y: ARENA_HEIGHT - 1 })
      .build();
    baseUserContext = {
      unitId: UNIT_ID,
    };
  });

  it('handles move down properly', () => {
    const intent = new MoveIntent(Direction.Down);

    const newState = intent.execute(neutralPositionState, baseUserContext);

    expect(newState.objectMap[UNIT_ID].position.y).toBe(2);
  });

  it('handles move up properly', () => {
    const intent = new MoveIntent(Direction.Up);

    const newState = intent.execute(neutralPositionState, baseUserContext);

    expect(newState.objectMap[UNIT_ID].position.y).toBe(0);
  });

  it('handles move right properly', () => {
    const intent = new MoveIntent(Direction.Right);

    const newState = intent.execute(neutralPositionState, baseUserContext);

    expect(newState.objectMap[UNIT_ID].position.x).toBe(2);
  });

  it('handles move left properly', () => {
    const intent = new MoveIntent(Direction.Left);

    const newState = intent.execute(neutralPositionState, baseUserContext);

    expect(newState.objectMap[UNIT_ID].position.x).toBe(0);
  });

  it('handles position conflicts', () => {
    const intent = new MoveIntent(Direction.Down);

    const newState = intent.execute(
      StateBuilder.buildState()
        .addUnit({ id: 'unit1', x: 0, y: 0 })
        .addUnit({ id: 'unit2', x: 0, y: 1 })
        .build(),
      baseUserContext
    );

    expect(newState.objectMap[UNIT_ID].position.y).toBe(0);
    expect(newState.objectMap.unit2.position.y).toBe(1);
  });

  it('handles non-blocking position conflicts', () => {
    const intent = new MoveIntent(Direction.Down);

    const newState = intent.execute(
      StateBuilder.buildState()
        .addUnit({ id: 'unit1', x: 0, y: 0 })
        .addFood({ id: 'food1', x: 0, y: 1 })
        .build(),
      baseUserContext
    );

    expect(newState.objectMap[UNIT_ID].position.y).toBe(1);
    expect(newState.objectMap.food1.position.y).toBe(1);
  });

  it('handles lower y system boundaries', () => {
    const intent = new MoveIntent(Direction.Up);

    const newState = intent.execute(lowerPositionState, baseUserContext);

    expect(newState.objectMap[UNIT_ID].position.y).toBe(0);
  });

  it('handles lower x system boundaries', () => {
    const intent = new MoveIntent(Direction.Left);

    const newState = intent.execute(lowerPositionState, baseUserContext);

    expect(newState.objectMap[UNIT_ID].position.x).toBe(0);
  });

  it('handles upper y system boundaries', () => {
    const intent = new MoveIntent(Direction.Down);

    const newState = intent.execute(upperPositionState, baseUserContext);

    expect(newState.objectMap[UNIT_ID].position.y).toBe(ARENA_HEIGHT - 1);
  });

  it('handles upper x system boundaries', () => {
    const intent = new MoveIntent(Direction.Right);

    const newState = intent.execute(upperPositionState, baseUserContext);

    expect(newState.objectMap[UNIT_ID].position.x).toBe(ARENA_WIDTH - 1);
  });

  it('handles dead units', () => {
    const intent = new ConsumeIntent();

    const emptyState = StateBuilder.buildState().build();
    const newState = intent.execute(emptyState, baseUserContext);

    expect(newState).toBe(emptyState);
  });
});
