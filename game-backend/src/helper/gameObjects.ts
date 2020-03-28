import { State } from '../../../darwin-types/State';
import {
  GameObject,
  GAME_OBJECT_TYPES,
  ObjectId,
} from '../../../darwin-types/game-objects/GameObject';
import { Food } from '../../../darwin-types/game-objects/Food';
import Position from '../../../darwin-types/Position';
import { Unit, INITIAL_HEALTH } from '../../../darwin-types/game-objects/Unit';

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
  health = INITIAL_HEALTH,
}: {
  id: string;
  position: Position;
  health?: number;
}): Unit => ({
  id,
  position,
  health,
  moveBlocking: true,
  type: GAME_OBJECT_TYPES.UNIT,
});

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

export const getNearestFood = (state: State, unit: Unit): Food => {
  const foods = getGameObjectsPerType(state, GAME_OBJECT_TYPES.FOOD);
  const sortedFoods = foods
    .map(food => ({
      food,
      distance:
        Math.abs(food.position.x - unit.position.x) +
        Math.abs(food.position.y - unit.position.y),
    }))
    .sort((a, b) => (a.distance < b.distance ? -1 : 1));
  const nearestFood = sortedFoods.length > 0 ? sortedFoods[0].food : undefined;
  return nearestFood;
};

export const countGameObjectsPerType = (state: State, type: string): number =>
  getGameObjectsPerType(state, type).length;

export const countUnits = (state: State): number =>
  countGameObjectsPerType(state, GAME_OBJECT_TYPES.UNIT);

export const countFood = (state: State): number =>
  countGameObjectsPerType(state, GAME_OBJECT_TYPES.FOOD);
