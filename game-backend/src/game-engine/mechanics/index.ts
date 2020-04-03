import { State } from '@darwin/types';
import handleFoodSpawning from './food-spawner';
import handleHunger from './hunger-handler';

const HANDLERS = [handleHunger, handleFoodSpawning];

function handleGameMechanics(state: State): State {
  return HANDLERS.reduce(
    (newState: State, handler) => handler(newState),
    state
  );
}

export default handleGameMechanics;
