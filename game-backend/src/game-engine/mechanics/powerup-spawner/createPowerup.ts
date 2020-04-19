import { Consumable, ObjectId, Position, PowerupType } from '@darwin/types';

type params = { id: ObjectId; position: Position; type: PowerupType };

const createPowerup = ({ id, position, type }: params): Consumable => ({
  id,
  position,
  type,
  moveBlocking: false,
});

export default createPowerup;
