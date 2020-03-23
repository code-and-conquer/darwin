import { State } from '../../../../darwin-types/State';
import { ObjectId } from '../../../../darwin-types/game-objects/GameObject';
import { Unit } from '../../../../darwin-types/game-objects/Unit';

const selectUserUnit = (state: State, unitID: ObjectId): Unit => {
  return state.objectMap[unitID] as Unit;
};
export default selectUserUnit;
