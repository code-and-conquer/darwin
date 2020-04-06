import { State, ObjectId, Unit, GameObjectTypes } from '@darwin/types';
import { getGameObjectsPerType } from '../../helper/gameObjects';
import getNearestObjectOfType from './helper';

const selectUserUnit = (state: State, unitID: ObjectId): Unit => {
  return state.objectMap[unitID] as Unit;
};

const selectEnemyUnits = (state: State, unitID: ObjectId): Unit[] => {
  return getGameObjectsPerType(state, GameObjectTypes.Unit).filter(
    unit => unit.id !== unitID
  ) as Unit[];
};

const selectNearestEnemyUnit = (state: State, unit: Unit): Unit => {
  return getNearestObjectOfType<Unit>(state, unit, GameObjectTypes.Unit);
};

export { selectUserUnit, selectEnemyUnits, selectNearestEnemyUnit };
