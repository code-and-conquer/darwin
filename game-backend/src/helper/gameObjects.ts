import {
  Attributes,
  Consumable,
  GameObjectTypes,
  GameObject,
  INITIAL_HEALTH,
  INITIAL_ATTRIBUTES,
  ObjectId,
  State,
  Unit,
  Position,
} from '@darwin/types';

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
}): Consumable => ({
  id,
  position,
  moveBlocking: false,
  type: GameObjectTypes.Food,
});

export const createUnit = ({
  id,
  position,
  health = INITIAL_HEALTH,
  attributes = INITIAL_ATTRIBUTES,
}: {
  id: string;
  position: Position;
  health?: number;
  attributes?: Attributes;
}): Unit => ({
  id,
  position,
  health,
  attributes,
  moveBlocking: true,
  type: GameObjectTypes.Unit,
});

const getObjectById = (state: State, id: ObjectId): GameObject =>
  state.objectMap[id];

export const getFood = (state: State, id: ObjectId): Consumable =>
  getObjectById(state, id) as Consumable;
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
  countGameObjectsPerType(state, GameObjectTypes.Unit);

export const countFood = (state: State): number =>
  countGameObjectsPerType(state, GameObjectTypes.Food);
