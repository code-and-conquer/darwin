import {
  Food,
  GAME_OBJECT_TYPES,
  GameObject,
  INITIAL_HEALTH,
  ObjectId,
  State,
  Unit,
  Position,
} from '@darwin/types';

export const getGameObjectsPerType = <T extends GameObject>(
  state: State,
  type: string
): T[] =>
  state.objectIds
    .map(id => state.objectMap[id])
    .filter(obj => obj.type === type) as T[];

const getObjectById = (state: State, id: ObjectId): GameObject =>
  state.objectMap[id];

export const getFood = (state: State, id: ObjectId): Food =>
  getObjectById(state, id) as Food;
export const getUnit = (state: State, id: ObjectId): Unit =>
  getObjectById(state, id) as Unit;

export const removeGameObject = (state: State, idToDelete: ObjectId): State => {
  const { [idToDelete]: omit, ...newObjectMap } = state.objectMap;

  return {
    ...state,
    objectIds: state.objectIds.filter(id => id !== idToDelete),
    objectMap: newObjectMap,
  };
};

export const countGameObjectsPerType = (state: State, type: string): number =>
  getGameObjectsPerType(state, type).length;

export const countUnits = (state: State): number =>
  countGameObjectsPerType(state, GAME_OBJECT_TYPES.UNIT);

export const countFood = (state: State): number =>
  countGameObjectsPerType(state, GAME_OBJECT_TYPES.FOOD);
