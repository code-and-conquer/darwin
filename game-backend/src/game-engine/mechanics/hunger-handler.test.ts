import {
  MAX_HEALTH,
  State,
  INITIAL_ATTRIBUTES,
  ATTRIBUTES,
} from '@darwin/types';
import StateBuilder from '../../test-helper/StateBuilder';
import handleHunger from './hunger-handler';
import { getUnit } from '../../helper/gameObjects';

describe('Hunger Handling', () => {
  const UNIT_ID1 = 'unit1';
  const UNIT_ID2 = 'unit2';
  const UNIT_ID3 = 'unit3';

  it('decreases health', () => {
    const state: State = StateBuilder.buildState()
      .addUnit({
        id: UNIT_ID1,
        x: 1,
        y: 1,
        health: MAX_HEALTH,
      })
      .addUnit({
        id: UNIT_ID2,
        x: 2,
        y: 2,
        health: MAX_HEALTH,
        attributes: {
          ...INITIAL_ATTRIBUTES,
          [ATTRIBUTES.ENDURANCE_BOOST]: 2,
        },
      })
      .addUnit({
        id: UNIT_ID3,
        x: 3,
        y: 3,
        health: MAX_HEALTH,
        attributes: {
          ...INITIAL_ATTRIBUTES,
          [ATTRIBUTES.ENDURANCE_BOOST]: -2,
        },
      })
      .build();

    const newState = handleHunger(state);

    expect(getUnit(newState, UNIT_ID1).health).toBe(97);
    expect(getUnit(newState, UNIT_ID2).health).toBe(99);
    expect(getUnit(newState, UNIT_ID3).health).toBe(95);
  });
});
