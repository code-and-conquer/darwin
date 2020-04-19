import { GameObjectTypes } from '@darwin/types';
import { getFood, getUnit } from './gameObjects';
import { isPowerup, getPowerups, countPowerups } from './powerup';
import StateBuilder from '../test-helper/StateBuilder';
import { getConsumable } from './consumable';

const FOOD_ID = 'food';
const UNIT_ID = 'unit';
const POWERUP_ID = 'powerup';

const state = StateBuilder.buildState()
  .addFood({ id: FOOD_ID, x: 1, y: 1 })
  .addUnit({ id: UNIT_ID, x: 1, y: 1 })
  .addPowerup({
    id: POWERUP_ID,
    x: 1,
    y: 1,
    type: GameObjectTypes.EnduranceBoost,
  })
  .build();

const food = getFood(state, FOOD_ID);
const unit = getUnit(state, UNIT_ID);
const powerup = getConsumable(state, POWERUP_ID);

describe('isPowerUp', () => {
  it('should specify whether object is a powerup', () => {
    expect(isPowerup(unit)).toBe(false);
    expect(isPowerup(food)).toBe(false);
    expect(isPowerup(powerup)).toBe(true);
  });
});

describe('getPowerups', () => {
  it('should filter out non-powerups', () => {
    const filtered = getPowerups(state);
    expect(filtered.length).toBe(1);
    expect(filtered).toContain(powerup);
    expect(filtered).not.toContain(food);
    expect(filtered).not.toContain(unit);
  });
});

describe('countPowerups', () => {
  it('should filter out non-powerups', () => {
    const count = countPowerups(state);
    expect(count).toBe(1);
  });
});
