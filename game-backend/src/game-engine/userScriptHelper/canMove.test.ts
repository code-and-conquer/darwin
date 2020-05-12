import StateBuilder from '../../test-helper/StateBuilder';
import { getUnit } from '../../helper/gameObjects';
import canMove from './canMove';
import { Direction } from '../intent/MoveIntent';

describe('canMove', () => {
  it('is correctly computed', () => {
    const TOP_UNIT_ID = 'TOP_UNIT_ID';
    const LEFT_UNIT_ID = 'LEFT_UNIT_ID';
    const CENTER_UNIT_ID = 'CENTER_UNIT_ID';
    const RIGHT_UNIT_ID = 'RIGHT_UNIT_ID';

    const state = StateBuilder.buildState()
      .addFood({ id: 'FOOD', x: 0, y: 0 })
      .addUnit({
        id: TOP_UNIT_ID,
        x: 1,
        y: 0,
      })
      .addUnit({
        id: LEFT_UNIT_ID,
        x: 0,
        y: 1,
      })
      .addUnit({
        id: CENTER_UNIT_ID,
        x: 1,
        y: 1,
      })
      .addUnit({
        id: RIGHT_UNIT_ID,
        x: 2,
        y: 1,
      })
      .build();

    const topUnit = getUnit(state, TOP_UNIT_ID);

    expect(canMove(Direction.Up, topUnit, state)).toBe(false);
    expect(canMove(Direction.Right, topUnit, state)).toBe(true);
    expect(canMove(Direction.Left, topUnit, state)).toBe(true);
    expect(canMove(Direction.Down, topUnit, state)).toBe(false);
  });
});
