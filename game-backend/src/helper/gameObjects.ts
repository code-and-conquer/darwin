import { State } from '../../../darwin-types/State';
import {
  GAME_OBJECT_TYPES,
  GameObject,
} from '../../../darwin-types/game-objects/GameObject';

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
