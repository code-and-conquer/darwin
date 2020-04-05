import {
  Position,
  GAME_OBJECT_TYPES,
  PowerUpType,
  CONSUMABLE_CATEGORIES,
  Consumable,
} from '@darwin/types';

type CreatePowerUp = (params: {
  id: string;
  position: Position;
  subType: PowerUpType;
}) => Consumable;

const createPowerUp: CreatePowerUp = ({ id, position, subType }) => ({
  id,
  position,
  type: GAME_OBJECT_TYPES.CONSUMABLE,
  category: CONSUMABLE_CATEGORIES.POWER_UP,
  subType,
  moveBlocking: false,
  isConsumable: true,
});

export default createPowerUp;
