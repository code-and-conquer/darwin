import { State } from '../../../darwin-types/State';

export const countGameObjectsPerType = (state: State, type: string): number =>
  state.objectIds
    .map(id => state.objectMap[id])
    .filter(obj => obj.type === type).length;

export const countUnits = (state: State): number =>
  countGameObjectsPerType(state, 'unit');

export const countFood = (state: State): number =>
  countGameObjectsPerType(state, 'food');
