import { State } from '../../../darwin-types/State';
import { GAME_OBJECT_TYPES } from '../../../darwin-types/game-objects/GameObject';
import Position from '../../../darwin-types/Position';
import { ARENA_WIDTH, ARENA_HEIGHT } from '../../../darwin-types/Arena';

export const countGameObjectsPerType = (state: State, type: string): number =>
  state.objectIds
    .map(id => state.objectMap[id])
    .filter(obj => obj.type === type).length;

export const countUnits = (state: State): number =>
  countGameObjectsPerType(state, GAME_OBJECT_TYPES.UNIT);

export const countFood = (state: State): number =>
  countGameObjectsPerType(state, GAME_OBJECT_TYPES.FOOD);

export const generateFreePosition = (state: State): Position => {
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
  const occupiedFields: Position[] = state.objectIds.map(
    id => state.objectMap[id].position
  );
  const freeFields = fields.filter(
    field =>
      !!occupiedFields.find(
        occupiedField =>
          occupiedField.x === field.x && occupiedField.y === field.y
      )
  );

  const freeFieldsCount = freeFields.length;
  const randomIndex = Math.floor(Math.random() * freeFieldsCount);
  const freeRandomPosition = freeFields[randomIndex];

  return freeRandomPosition;
};
