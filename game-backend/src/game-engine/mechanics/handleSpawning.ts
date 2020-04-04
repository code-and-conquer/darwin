import { State, GameObject, Position } from '@darwin/types';
import { generateFreePosition } from '../../helper/fields';
import produce from '../../helper/produce';

type params = {
  limit: number;
  count: number;
  state: State;
  spawner: (position: Position) => GameObject;
};

const handleSpawning = ({ limit, count, spawner, state }: params): State => {
  if (count < limit) {
    const position = generateFreePosition(state);
    const gameObject = spawner(position);

    return produce(state, draft => {
      draft.objectMap[gameObject.id] = gameObject;
      draft.objectIds.push(gameObject.id);
    });
  }

  return state;
};

export default handleSpawning;
