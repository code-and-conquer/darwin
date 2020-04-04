import { State } from '@darwin/types';
import handleFoodSpawning from './food-spawner';
import handlePowerUpSpawning from './power-up-spawner';
import handleHunger from './hunger-handler';

const HANDLERS = [handleHunger, handleFoodSpawning, handlePowerUpSpawning];

function handleGameMechanics(state: State): State {
  return HANDLERS.reduce(
    (newState: State, handler) => handler(newState),
    state
  );
}

export default handleGameMechanics;
