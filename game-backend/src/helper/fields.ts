import {
  State,
  Position,
  ARENA_HEIGHT,
  ARENA_WIDTH,
  GameObject,
} from '@darwin/types';
import pickRandom from './array';

export const getFlatFieldArray = (): Position[] =>
  new Array(ARENA_WIDTH)
    .fill(undefined)
    .reduce(
      (acc, _, i) => [
        ...acc,
        ...new Array(ARENA_HEIGHT)
          .fill(undefined)
          .map((_, j) => ({ x: i, y: j })),
      ],
      []
    );

export const createKeyFromPosition = (pos: Position): string =>
  `${pos.x}:${pos.y}`;

export const getOccupiedFieldMap = (
  state: State
): Record<string, GameObject[]> =>
  state.objectIds.reduce((acc: Record<string, GameObject[]>, id) => {
    const obj = state.objectMap[id];
    const pos = obj.position;
    const key = createKeyFromPosition(pos);
    return {
      ...acc,
      [key]: [...(acc[key] || []), obj],
    };
  }, {});

export const getObjectsOnField = (
  state: State,
  position: Position
): GameObject[] => getOccupiedFieldMap(state)[createKeyFromPosition(position)];

export const getFreeFields = (state: State): Position[] => {
  const fields = getFlatFieldArray();
  const occupiedFields = getOccupiedFieldMap(state);
  const freeFields = fields.filter(
    field => !occupiedFields[`${field.x}:${field.y}`]
  );

  return freeFields;
};

export const generateFreePosition = (state: State): Position => {
  const freeFields = getFreeFields(state);
  const freeRandomPosition = pickRandom(freeFields);

  return freeRandomPosition;
};
