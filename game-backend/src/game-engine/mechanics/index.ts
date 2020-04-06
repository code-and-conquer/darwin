import { State } from '@darwin/types';
import handleFoodSpawning from './food-spawner';
import handleHunger from './hunger-handler';
import handleDeath from './death-handler';

const HANDLERS = [handleHunger, handleDeath, handleFoodSpawning];

function handleGameMechanics(state: State): State {
  return HANDLERS.reduce(
    (newState: State, handler) => handler(newState),
    state
  );
}

export default handleGameMechanics;
