import {
  State,
  Unit,
  GameObject,
  Position,
  ARENA_WIDTH,
  ARENA_HEIGHT,
} from '@darwin/types';
import { Direction } from '../intent/MoveIntent';
import { getObjectsOnField } from '../../helper/fields';

const canMove = (direction: Direction, unit: Unit, state: State): boolean => {
  const getMoveBlockingObjectsOnField = (position: Position): GameObject[] =>
    getObjectsOnField(state, position).filter(
      gameObject => gameObject.moveBlocking
    );

  const checkAreaBoundaries = ({ x, y }: Position): boolean =>
    x >= 0 && x < ARENA_WIDTH && y >= 0 && y < ARENA_HEIGHT;

  const getNewPosition = (): Position => {
    const { x, y } = unit.position;
    switch (direction) {
      case Direction.Up:
        return { x, y: y - 1 };
      case Direction.Right:
        return { x: x + 1, y };
      case Direction.Down:
        return { x, y: y + 1 };
      case Direction.Left:
        return { x: x - 1, y };
      default:
        return { x, y };
    }
  };

  const newPosition = getNewPosition();
  return (
    checkAreaBoundaries(newPosition) &&
    getMoveBlockingObjectsOnField(newPosition).length <= 0
  );
};

export default canMove;
