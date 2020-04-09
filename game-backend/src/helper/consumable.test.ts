import { GameObjectTypes } from '@darwin/types';
import { createFood, createUnit } from './gameObjects';
import createPowerup from '../game-engine/mechanics/powerup-spawner/createPowerup';
import { isConsumable, filterConsumables } from './consumable';

const food = createFood({ id: 'food', position: { x: 1, y: 1 } });
const unit = createUnit({ id: 'unit', position: { x: 1, y: 1 } });
const powerup = createPowerup({
  id: 'powerup',
  position: { x: 1, y: 1 },
  type: GameObjectTypes.EnduranceBoost,
});

describe('isConsumable', () => {
  it('should specify whether object is consumable', () => {
    expect(isConsumable(unit)).toBe(false);
    expect(isConsumable(food)).toBe(true);
    expect(isConsumable(powerup)).toBe(true);
  });
});

describe('filterConsumables', () => {
  it('should filter out non-consumables', () => {
    const filtered = filterConsumables([food, unit, powerup]);
    expect(filtered.length).toBe(2);
    expect(filtered).toContain(food);
    expect(filtered).toContain(powerup);
    expect(filtered).not.toContain(unit);
  });
});
