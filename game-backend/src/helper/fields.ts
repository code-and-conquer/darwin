import { State } from '../../../darwin-types/State';
import Position from '../../../darwin-types/Position';
import { ARENA_WIDTH, ARENA_HEIGHT } from '../../../darwin-types/Arena';
import { GameObject } from '../../../darwin-types/game-objects/GameObject';

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
