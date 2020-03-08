import { Intent } from './Intent';
import { State } from '../../../../darwin-types/State';
import { UserContext } from '../../../../darwin-types/UserContext';

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

  execute(state: State, userContext: UserContext): State {
    const unit = state.objectMap[userContext.unitId];

    const position = {
      ...unit.position,
    };
    switch (this.direction) {
      case Direction.Up:
        position.x--;
        break;
      case Direction.Down:
        position.x++;
        break;
      case Direction.Left:
        position.y--;
        break;
      case Direction.Right:
        position.y++;
        break;
      default:
    }
    return {
      ...state,
      objectMap: {
        ...state.objectMap,
        [unit.id]: {
          ...unit,
          position,
        },
      },
    };
  }
}
