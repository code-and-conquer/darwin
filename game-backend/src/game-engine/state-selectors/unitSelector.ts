import { State, ObjectId, Unit } from '@darwin/types';

const selectUserUnit = (state: State, unitID: ObjectId): Unit => {
  return state.objectMap[unitID] as Unit;
};
export default selectUserUnit;
