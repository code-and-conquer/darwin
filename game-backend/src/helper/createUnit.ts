import {
  GAME_OBJECT_TYPES,
  INITIAL_HEALTH,
  Unit,
  Position,
  INITIAL_ATTRIBUTES,
  Attributes,
} from '@darwin/types';

const createUnit = ({
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
  isConsumable: false,
  type: GAME_OBJECT_TYPES.UNIT,
});

export default createUnit;
