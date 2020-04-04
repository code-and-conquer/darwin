import { State } from '@darwin/types';
import StateBuilder from '../../test-helper/StateBuilder';
import { selectUserUnit } from './index';

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
