import { Intent } from './Intent';
import produce from '../../helper/produce';
import { State } from '../../../../darwin-types/State';
import { UserContext } from '../../../../darwin-types/UserContext';
import Position from '../../../../darwin-types/Position';
import { ARENA_HEIGHT, ARENA_WIDTH } from '../../../../darwin-types/Arena';

export enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}

/**
 * Represents the intent to move the player around.
 */
export default class MoveIntent implements Intent {
  constructor(private direction: Direction) {}

  private move(originalPosition: Position): Position {
    const position = {
      ...originalPosition,
    };
    switch (this.direction) {
      case Direction.Up:
        position.y--;
        break;
      case Direction.Down:
        position.y++;
        break;
      case Direction.Left:
        position.x--;
        break;
      case Direction.Right:
        position.x++;
        break;
      default:
    }
    return position;
  }

  private static checkBoundaries(position: Position): Position {
    const x = Math.min(position.x, ARENA_HEIGHT - 1);
    const y = Math.min(position.y, ARENA_WIDTH - 1);
    return {
      x: Math.max(0, x),
      y: Math.max(0, y),
    };
  }

  execute(state: State, userContext: UserContext): State {
    const unit = state.objectMap[userContext.unitId];
    const position = MoveIntent.checkBoundaries(this.move(unit.position));
    const conflictingObject = state.objectIds
      .map(id => state.objectMap[id])
      .find(
        object =>
          object.position.x === position.x && object.position.y === position.y
      );
    const hasConflictingObject = conflictingObject !== undefined;
    return produce(state, draft => {
      draft.objectMap[unit.id].position = hasConflictingObject
        ? unit.position
        : position;
    });
  }
}
