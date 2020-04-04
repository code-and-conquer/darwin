import {
  Position,
  State,
  GAME_OBJECT_TYPES,
  UserContext,
  Consume,
  PowerUp,
  ATTRIBUTES,
} from '@darwin/types';
import produce from '../../../helper/produce';
import { getUnit, removeGameObject } from '../../../helper/gameObjects';
import { updateAttribute } from '../../../helper/attributes';

interface CreatePowerUpParams {
  id: string;
  position: Position;
}
type CreatePowerUp = (params: CreatePowerUpParams) => PowerUp;

export const createPowerUp = ({
  id,
  position,
  subType,
  consume,
}: {
  id: string;
  position: Position;
  subType: string;
  consume: Consume;
}): PowerUp => ({
  id,
  position,
  moveBlocking: false,
  isConsumable: true,
  type: GAME_OBJECT_TYPES.POWER_UP,
  subType,
  consume,
});

export const createEndurancePowerUp: CreatePowerUp = ({ id, position }) =>
  createPowerUp({
    id,
    position,
    subType: ATTRIBUTES.ENDURANCE_BOOST,
    consume: (state: State, userContext: UserContext): State => {
      return produce(state, draft => {
        const unit = getUnit(draft, userContext.unitId);
        const { value, hasChanged } = updateAttribute(
          unit,
          ATTRIBUTES.ENDURANCE_BOOST,
          currentBoost => currentBoost + 1
        );

        if (hasChanged) {
          unit.attributes[ATTRIBUTES.ENDURANCE_BOOST] = value;

          const { objectIds, objectMap } = removeGameObject(draft, id);
          draft.objectMap = objectMap;
          draft.objectIds = objectIds;
        }
      });
    },
  });

const POWER_UP_MAP: { [k: string]: CreatePowerUp } = {
  [ATTRIBUTES.ENDURANCE_BOOST]: createEndurancePowerUp,
};

export const powerUpSpawners = Object.values(POWER_UP_MAP);

interface CreatePowerUpHelperParams extends CreatePowerUpParams {
  subType: string;
}
export const createPowerUpHelper = ({
  subType,
  ...rest
}: CreatePowerUpHelperParams): PowerUp => POWER_UP_MAP[subType](rest);
