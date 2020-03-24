import { State } from '../../../darwin-types/State';
import {
  GameObject,
  GAME_OBJECT_TYPES,
} from '../../../darwin-types/game-objects/GameObject';
import { Food } from '../../../darwin-types/game-objects/Food';
import Position from '../../../darwin-types/Position';
import { Unit } from '../../../darwin-types/game-objects/Unit';

export const getGameObjectsPerType = (
  state: State,
  type: string
): GameObject[] =>
  state.objectIds
    .map(id => state.objectMap[id])
    .filter(obj => obj.type === type);

export const createFood = ({
  id,
  position,
}: {
  id: string;
  position: Position;
}): Food => ({
  id,
  position,
  moveBlocking: false,
  type: GAME_OBJECT_TYPES.FOOD,
});

export const createUnit = ({
  id,
  position,
  health = 100,
}: {
  id: string;
  position: Position;
  health?: number;
}): Unit => ({
  id,
  position,
  health,
  moveBlocking: false,
  type: GAME_OBJECT_TYPES.FOOD,
});

export const countGameObjectsPerType = (state: State, type: string): number =>
  getGameObjectsPerType(state, type).length;

export const countUnits = (state: State): number =>
  countGameObjectsPerType(state, GAME_OBJECT_TYPES.UNIT);

export const countFood = (state: State): number =>
  countGameObjectsPerType(state, GAME_OBJECT_TYPES.FOOD);
