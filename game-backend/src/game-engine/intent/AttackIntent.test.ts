import { State, Unit, UserContext } from '@darwin/types';
import AttackIntent, { HIT_DAMAGE } from './AttackIntent';
import StateBuilder from '../../test-helper/StateBuilder';
import { getUnit } from '../../helper/gameObjects';

describe('AttackIntent', () => {
  const attackerUnitId = 'UNIT_ID_1';
  const defenderUnitId = 'UNIT_ID_2';
  const notReachableUnitId = 'UNIT_ID_3';

  let state: State;
  let userContext: UserContext;

  let defenderUnit: Unit;
  let notReachableUnit: Unit;

  beforeEach(() => {
    state = StateBuilder.buildState()
      .addUnit({ id: attackerUnitId, x: 1, y: 1, health: 65 })
      .addUnit({ id: defenderUnitId, x: 2, y: 1, health: 90 })
      .addUnit({ id: notReachableUnitId, x: 5, y: 5, health: 5 })
      .build();

    defenderUnit = getUnit(state, defenderUnitId);
    notReachableUnit = getUnit(state, notReachableUnitId);

    userContext = {
      unitId: attackerUnitId,
    };
  });

  it('handles attacking properly', () => {
    const intent = new AttackIntent(defenderUnit);

    const newState = intent.execute(state, userContext);
    const defender = getUnit(newState, defenderUnitId);

    expect(defender.health).toBe(defenderUnit.health - HIT_DAMAGE);
  });

  it('does nothing if enemy is not in reach', () => {
    const intent = new AttackIntent(notReachableUnit);

    const newState = intent.execute(state, userContext);

    expect(newState).toEqual(state);
  });

  it('does nothing if invalid enemy object is passed', () => {
    const intent = new AttackIntent({ id: 'noUnit' } as Unit);

    const newState = intent.execute(state, userContext);

    expect(newState).toEqual(state);
  });
});
