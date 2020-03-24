import { State } from '../../../darwin-types/State';
import {
  GAME_OBJECT_TYPES,
  GameObject,
} from '../../../darwin-types/game-objects/GameObject';
import Position from '../../../darwin-types/Position';
import { ARENA_WIDTH, ARENA_HEIGHT } from '../../../darwin-types/Arena';


export const getGameObjectsPerType = (
  state: State,
  type: string
): GameObject[] =>
  state.objectIds
    .map(id => state.objectMap[id])
    .filter(obj => obj.type === type);

export const countGameObjectsPerType = (state: State, type: string): number =>
  getGameObjectsPerType(state, type).length;

export const countUnits = (state: State): number =>
  countGameObjectsPerType(state, GAME_OBJECT_TYPES.UNIT);

export const countFood = (state: State): number =>
  countGameObjectsPerType(state, GAME_OBJECT_TYPES.FOOD);

export const getFreeFields = (state: State) => {
  const fields: Position[] = new Array(ARENA_WIDTH)
    .fill(undefined)
    .reduce(
      (acc, _, i) => [
        ...acc,
        ...new Array(ARENA_HEIGHT)
          .fill(undefined)
          .map((omit, j) => ({ x: i, y: j })),
      ],
      []
    );
  const occupiedFields: Record<string, boolean> = state.objectIds.reduce(
    (acc, id) => {
      const pos = state.objectMap[id].position;
      return {
        ...acc,
        [`${pos.x}:${pos.y}`]: true,
      };
    },
    {}
  );
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
