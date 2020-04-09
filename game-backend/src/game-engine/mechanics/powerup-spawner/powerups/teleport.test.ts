import { State, GameObjectTypes, UserContext } from '@darwin/types';
import StateBuilder from '../../../../test-helper/StateBuilder';
import { getUnit } from '../../../../helper/gameObjects';
import consumeTeleport from './teleport';
import { Position } from '../../../../../../darwin-types/dist/Position';

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
      x: 1,
      y: 1,
      attributes: {},
    })
    .addPowerup({
      id: POWERUP_ID,
      x: 3,
      y: 3,
      type: GameObjectTypes.Teleport,
    })
    .build();

  it('unit position should be different if teleport is consumed', () => {
    const newState = consumeTeleport(POWERUP_ID, state, normalUserContext);

    const unit = getUnit(newState, NORMAL_UNIT_ID);

    expect(unit.position).not.toBe(initialPosition);
  });
});
