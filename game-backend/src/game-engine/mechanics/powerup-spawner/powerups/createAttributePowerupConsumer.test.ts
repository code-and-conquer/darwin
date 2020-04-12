import {
  State,
  GameObjectTypes,
  UserContext,
  AttributeName,
} from '@darwin/types';
import StateBuilder from '../../../../test-helper/StateBuilder';
import { getUnit } from '../../../../helper/gameObjects';
import { getConsumable } from '../../../../helper/consumable';
import { ATTRIBUTE_BOUNDARIES } from '../../../../helper/attribute';
import createAttributePowerupConsumer from './createAttributePowerupConsumer';

describe('createAttributePowerupConsumer', () => {
  const NORMAL_UNIT_ID = 'unit1';
  const MAXED_UNIT_ID = 'unit2';
  const POWERUP_ID = 'powerup1';

  const normalUserContext: UserContext = {
    unitId: NORMAL_UNIT_ID,
  };
  const maxedUserContext: UserContext = {
    unitId: MAXED_UNIT_ID,
  };

  const state: State = StateBuilder.buildState()
    .addUnit({
      id: NORMAL_UNIT_ID,
      x: 1,
      y: 1,
      attributes: { healthRegenBoost: 0 },
    })
    .addUnit({
      id: MAXED_UNIT_ID,
      x: 1,
      y: 1,
      attributes: {
        healthRegenBoost: ATTRIBUTE_BOUNDARIES.healthRegenBoost.max,
      },
    })
    .addPowerup({
      id: POWERUP_ID,
      x: 1,
      y: 1,
      type: GameObjectTypes.HealthRegenBoost,
    })
    .build();

  const consumeHealthRegenBoost = createAttributePowerupConsumer(
    AttributeName.HealthRegenBoost,
    currentBoost => currentBoost + 5
  );

  it('should enhance units attribute when consumed and remove powerup', () => {
    const newState = consumeHealthRegenBoost(
      POWERUP_ID,
      state,
      normalUserContext
    );

    const unit = getUnit(newState, NORMAL_UNIT_ID);
    const powerup = getConsumable(newState, POWERUP_ID);

    expect(unit.attributes.healthRegenBoost).toBe(5);
    expect(powerup).toBeUndefined();
    expect(newState.objectIds).not.toContain(POWERUP_ID);
  });

  it('should respect attribute boundaries and not remove powerup', () => {
    const newState = consumeHealthRegenBoost(
      POWERUP_ID,
      state,
      maxedUserContext
    );

    const unit = getUnit(newState, MAXED_UNIT_ID);
    const powerup = getConsumable(newState, POWERUP_ID);

    expect(unit.attributes.healthRegenBoost).toBe(
      ATTRIBUTE_BOUNDARIES.healthRegenBoost.max
    );
    expect(powerup).toBeDefined();
    expect(newState.objectIds).toContain(POWERUP_ID);
  });
});
