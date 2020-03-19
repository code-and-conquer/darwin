import { State } from '../../../darwin-types/State';
import { GAME_OBJECT_TYPES } from '../../../darwin-types/game-objects/GameObject';

export const countGameObjectsPerType = (state: State, type: string): number =>
  state.objectIds
    .map(id => state.objectMap[id])
    .filter(obj => obj.type === type).length;

export const countUnits = (state: State): number =>
  countGameObjectsPerType(state, GAME_OBJECT_TYPES.UNIT);

export const countFood = (state: State): number =>
  countGameObjectsPerType(state, GAME_OBJECT_TYPES.FOOD);
