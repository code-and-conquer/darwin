import { State, ObjectId, Unit, GAME_OBJECT_TYPES } from '@darwin/types';
import { getGameObjectsPerType } from '../../helper/gameObjects';
import { getNearestObjectOfType } from './helper';

const selectUserUnit = (state: State, unitID: ObjectId): Unit => {
  return state.objectMap[unitID] as Unit;
};

const selectEnemyUnits = (state: State, unitID: ObjectId): Unit[] => {
  return getGameObjectsPerType(state, GAME_OBJECT_TYPES.UNIT).filter(
    unit => unit.id !== unitID
  ) as Unit[];
};

const selectNearestEnemyUnit = (state: State, unit: Unit): Unit => {
  return getNearestObjectOfType(state, unit, GAME_OBJECT_TYPES.UNIT);
};

export { selectUserUnit, selectEnemyUnits, selectNearestEnemyUnit };
