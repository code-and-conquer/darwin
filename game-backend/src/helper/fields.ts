import {
  State,
  Position,
  ARENA_HEIGHT,
  ARENA_WIDTH,
  GameObject,
} from '@darwin/types';

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

export const getOccupiedFieldMap = <T extends GameObject>(
  state: State
): Record<string, T[]> =>
  state.objectIds.reduce((acc: Record<string, T[]>, id) => {
    const obj = state.objectMap[id] as T;
    const pos = obj.position;
    const key = createKeyFromPosition(pos);
    return {
      ...acc,
      [key]: [...(acc[key] || []), obj],
    };
  }, {});

export const getObjectsOnField = <T extends GameObject>(
  state: State,
  position: Position
): T[] => getOccupiedFieldMap<T>(state)[createKeyFromPosition(position)];

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
  const freeFieldsCount = freeFields.length;
  const randomIndex = Math.floor(Math.random() * freeFieldsCount);
  const freeRandomPosition = freeFields[randomIndex];

  return freeRandomPosition;
};
