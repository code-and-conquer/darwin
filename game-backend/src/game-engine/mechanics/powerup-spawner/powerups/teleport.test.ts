import { State, GameObjectTypes, UserContext } from '@darwin/types';
import StateBuilder from '../../../../test-helper/StateBuilder';
import { getUnit } from '../../../../helper/gameObjects';
import consumeTeleport from './teleport';
import { Position } from '../../../../../../darwin-types/dist/Position';
import { getConsumable } from '../../../../helper/consumable';

describe('teleport powerup consumption', () => {
  const NORMAL_UNIT_ID = 'unit';
  const POWERUP_ID = 'teleport';

  const normalUserContext: UserContext = {
    unitId: NORMAL_UNIT_ID,
  };

  const initialPosition: Position = {
    x: 1,
    y: 1,
  };

  const state: State = StateBuilder.buildState()
    .addUnit({
      id: NORMAL_UNIT_ID,
      ...initialPosition,
      attributes: {},
    })
    .addPowerup({
      id: POWERUP_ID,
      ...initialPosition,
      type: GameObjectTypes.Teleport,
    })
    .build();

  it('unit position should be different if teleport is consumed', () => {
    const newState = consumeTeleport(POWERUP_ID, state, normalUserContext);

    const unit = getUnit(newState, NORMAL_UNIT_ID);
    const powerup = getConsumable(newState, POWERUP_ID);

    const hasCoordinateChange = (): boolean => {
      const unitCurrentPosition = unit.position;
      return unitCurrentPosition.x === initialPosition.x || unitCurrentPosition.y === initialPosition.y;
    };

    expect(hasCoordinateChange).toBeTruthy();
    expect(powerup).toBeUndefined();
  });
});
