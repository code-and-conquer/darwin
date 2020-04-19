import { State } from '@darwin/types';
import handleFoodSpawning from './food-spawner';
import handleHunger from './hunger-handler';
import handleDeath from './death-handler';
import handlePowerupSpawning from './powerup-spawner/index';

const HANDLERS = [
  handleHunger,
  handleDeath,
  handleFoodSpawning,
  handlePowerupSpawning,
];

function handleGameMechanics(state: State): State {
  return HANDLERS.reduce(
    (newState: State, handler) => handler(newState),
    state
  );
}

export default handleGameMechanics;
