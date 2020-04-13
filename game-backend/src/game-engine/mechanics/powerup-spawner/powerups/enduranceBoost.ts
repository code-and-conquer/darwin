import { Consume, AttributeName } from '@darwin/types';
import createAttributePowerupConsumer from './createAttributePowerupConsumer';

const consumeEnduranceBoost: Consume = createAttributePowerupConsumer(
  AttributeName.EnduranceBoost,
  currentBoost => currentBoost + 1
);

export default consumeEnduranceBoost;
