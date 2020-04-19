import { Consume, AttributeName } from '@darwin/types';
import { FOOD_REGENERATION_VALUE } from '../../food-spawner/consumeFood';
import createAttributePowerupConsumer from './createAttributePowerupConsumer';

const consumeHealthRegenBoost: Consume = createAttributePowerupConsumer(
  AttributeName.HealthRegenBoost,
  currentBoost => currentBoost + FOOD_REGENERATION_VALUE / 2
);

export default consumeHealthRegenBoost;
