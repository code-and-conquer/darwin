import {
  State,
  UserContext,
  ObjectId,
  ConsumableSubtype,
  CONSUMABLE_SUBTYPES,
} from '@darwin/types';
import consumeEnduranceBoost from './enduranceBoost';
import consumeFood from './food';

export type Consume = (
  id: ObjectId,
  state: State,
  userContext: UserContext
) => State;

export const consumeMap: Record<ConsumableSubtype, Consume> = {
  [CONSUMABLE_SUBTYPES.ENDURANCE_BOOST]: consumeEnduranceBoost,
  [CONSUMABLE_SUBTYPES.FOOD]: consumeFood,
};

export default consumeMap;
