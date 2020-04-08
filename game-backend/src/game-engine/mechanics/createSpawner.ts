import { State, GameObject, Position } from '@darwin/types';
import { generateFreePosition } from '../../helper/fields';
import produce from '../../helper/produce';

type params = {
  limit: (state: State) => number;
  count: (state: State) => number;
  spawn: (position: Position) => GameObject;
};

const createSpawner = ({ limit, count, spawn }: params) => (
  state: State
): State => {
  if (count(state) < limit(state)) {
    const position = generateFreePosition(state);
    const gameObject = spawn(position);

    return produce(state, draft => {
      draft.objectMap[gameObject.id] = gameObject;
      draft.objectIds.push(gameObject.id);
    });
  }

  return state;
};

export default createSpawner;
