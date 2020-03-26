import { State } from '../../../darwin-types/State';
import Position from '../../../darwin-types/Position';
import { ARENA_WIDTH, ARENA_HEIGHT } from '../../../darwin-types/Arena';

export const getFreeFields = (state: State): Position[] => {
  /* eslint no-shadow: ["error", { "allow": ["_"] }]*/
  const fields: Position[] = new Array(ARENA_WIDTH)
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
