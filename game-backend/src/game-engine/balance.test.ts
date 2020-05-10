import { ARENA_HEIGHT, ARENA_WIDTH, Unit } from '@darwin/types';
import { PER_TICK_ENERGY } from './schedule-intents/types';
import AttackIntent, { HIT_DAMAGE } from './intent/AttackIntent';
import { HEALTH_LOSS_RATE } from './mechanics/hunger-handler';
import ConsumeIntent from './intent/ConsumeIntent';
import { FOOD_REGENERATION_VALUE } from './mechanics/food-spawner/consumeFood';
import { FOOD_TO_UNIT_RATIO } from './mechanics/food-spawner';

/**
 * This test ensures configuration of boosts, consumption and general game logic is fair.
 *
 * There are currently no match statistics available, therefore some educated guesses are being taken for tuning.
 * The overall validity of the tests is based on the validity of the guesses.
 */
describe('game balance', () => {
  // survival rate of 1 means units never get to eat food and dies after health is used
  // survival rate of 2 means units live twice as long as the minimum life expectancy (1)
  // survival rate of Infinity means units never die
  const survivalRate = 1.4;

  // number of axis in game (x, y)
  const ARENA_DIMENSIONS = 2;
  // guessed average of steps required to consume food which is located close to the user
  // the more foods will be spawned per unit, the less steps need to be made to get a close food
  const stepsRequiredForFoodConsumption = Math.floor(
    Math.sqrt(ARENA_HEIGHT * ARENA_WIDTH) *
      ARENA_DIMENSIONS *
      (1 / FOOD_TO_UNIT_RATIO)
  );

  const costPerEnergyUnit = HEALTH_LOSS_RATE / PER_TICK_ENERGY;

  const consumeCost = new ConsumeIntent().cost;
  const moveCost = new ConsumeIntent().cost;

  const costPerConsumption = consumeCost * costPerEnergyUnit;
  const benefitPerFoodConsumption = FOOD_REGENERATION_VALUE;
  const benefitCostRatioForConsuming =
    benefitPerFoodConsumption / costPerConsumption;

  // assumed cost for consuming any item based on steps required and actual cost of consume
  const costPerFoodConsumption =
    moveCost * costPerEnergyUnit * stepsRequiredForFoodConsumption +
    costPerConsumption;

  /**
   * Ensure that attacking an enemy unit returns the same benefit as consuming food in a 1v1 match by comparing
   * benefit of consuming food to benefit of reducing the health of the enemy.
   *
   * Why 1v1? Because killing enemies does not have to grant any benefit until fighting against the last enemy.
   *   But when fighting against the last enemy it must be a viable strategy in order to win.
   *   Otherwise fighting would never be a reasonable approach within the game.
   */
  it('attacking and consuming benefits are fair in a 1v1 match', () => {
    const attackCost = new AttackIntent({} as Unit).cost;

    const costPerAttack = attackCost * costPerEnergyUnit;
    const benefitCostRatioForAttack = HIT_DAMAGE / costPerAttack;

    expect(benefitCostRatioForConsuming).toBeCloseTo(
      benefitCostRatioForAttack,
      0
    );
  });

  /**
   * Ensures that average life expectancy can be reached by consumption
   */
  it('consumption permits average life expectancy', () => {
    const benefitRatio = benefitPerFoodConsumption / costPerFoodConsumption;
    // rate of survival obtained by user script
    const gainedSurvivalRate = survivalRate - 1;
    expect(benefitRatio).toBeCloseTo(gainedSurvivalRate, 1);
  });
});
