import { State } from '@darwin/types';
import { getUnit } from '../../helper/gameObjects';
import StateBuilder from '../../test-helper/StateBuilder';
import { selectUserUnit } from './index';
import { selectNearestEnemyUnit, selectEnemyUnits } from './unitSelector';

describe('selectUserUnit', () => {
  const UNIT_ID = 'unit1';
  const multipleUnitCount = 10;
  let emptyState: State;
  let oneUnitState: State;
  let multipleUnitState: State;
  let multipleUnitStateBuilder: StateBuilder;

  beforeEach(() => {
    emptyState = StateBuilder.buildState().build();
    oneUnitState = StateBuilder.buildState()
      .addUnit({ id: UNIT_ID, x: 0, y: 0 })
      .build();
    multipleUnitStateBuilder = StateBuilder.buildState();
    for (let i = 1; i <= multipleUnitCount; i++) {
      multipleUnitStateBuilder.addFood({ id: `UNIT_${i}`, x: i, y: i });
    }
    multipleUnitState = multipleUnitStateBuilder
      .addUnit({ id: UNIT_ID, x: 0, y: 0 })
      .build();
  });

  it('selects no unit if there is none', () => {
    const unit = selectUserUnit(emptyState, UNIT_ID);

    expect(unit).toBeUndefined();
  });

  it('selects the correct unit if there is one', () => {
    const unit = selectUserUnit(oneUnitState, UNIT_ID);

    expect(unit.id).toBe(UNIT_ID);
  });

  it('selects the correct unit if there multiple', () => {
    const unit = selectUserUnit(multipleUnitState, UNIT_ID);

    expect(unit.id).toBe(UNIT_ID);
  });
});

describe('selectNearestEnemyUnit', () => {
  it('should get nearest enemy unit', () => {
    const USER_UNIT_ID = 'USER_UNIT_ID';
    const UNIT_ID1 = 'UNIT_ID1';
    const UNIT_ID2 = 'UNIT_ID2';
    const UNIT_ID3 = 'UNIT_ID3';
    const UNIT_ID4 = 'UNIT_ID4';
    const state = StateBuilder.buildState()
      .addUnit({ id: UNIT_ID1, x: 5, y: 17 })
      .addUnit({ id: UNIT_ID2, x: 5, y: 12 })
      .addUnit({ id: UNIT_ID3, x: 15, y: 17 })
      .addUnit({ id: UNIT_ID4, x: 4, y: 11 })
      .addUnit({ id: USER_UNIT_ID, x: 2, y: 10 })
      .build();
    const unit = getUnit(state, USER_UNIT_ID);
    const expectedNearestEnemyUnit = getUnit(state, UNIT_ID4);

    const enemyUnit = selectNearestEnemyUnit(state, unit);

    expect(enemyUnit).toBe(expectedNearestEnemyUnit);
  });
  it('should not fail, if no enemy unit is available', () => {
    const USEER_UNIT_ID = 'USER_UNIT_ID';
    const state = StateBuilder.buildState()
      .addUnit({ id: USEER_UNIT_ID, x: 2, y: 10 })
      .build();

    const unit = getUnit(state, USEER_UNIT_ID);
    const enemyUnit = selectNearestEnemyUnit(state, unit);
    expect(enemyUnit).toBeFalsy();
  });
});

describe('selectEnemyUnits', () => {
  it('should not return own unit in list', () => {
    const USER_UNIT_ID = 'USER_UNIT_ID';
    const UNIT_ID1 = 'UNIT_ID1';
    const UNIT_ID2 = 'UNIT_ID2';
    const UNIT_ID3 = 'UNIT_ID3';
    const UNIT_ID4 = 'UNIT_ID4';
    const state = StateBuilder.buildState()
      .addUnit({ id: UNIT_ID1, x: 5, y: 17 })
      .addUnit({ id: UNIT_ID2, x: 5, y: 12 })
      .addUnit({ id: UNIT_ID3, x: 15, y: 17 })
      .addUnit({ id: UNIT_ID4, x: 4, y: 11 })
      .addUnit({ id: USER_UNIT_ID, x: 2, y: 10 })
      .build();
    const unit = getUnit(state, USER_UNIT_ID);

    const enemyUnits = selectEnemyUnits(state, USER_UNIT_ID);

    expect(enemyUnits.length).toBe(4);
    expect(enemyUnits).not.toContain(unit);
  });
  it('should not fail, if no enemy unit is available', () => {
    const USEER_UNIT_ID = 'USER_UNIT_ID';
    const state = StateBuilder.buildState()
      .addUnit({ id: USEER_UNIT_ID, x: 2, y: 10 })
      .build();
    const unit = getUnit(state, USEER_UNIT_ID);

    const enemyUnits = selectEnemyUnits(state, USEER_UNIT_ID);

    expect(enemyUnits.length).toBe(0);
    expect(enemyUnits).not.toContain(unit);
  });
});
