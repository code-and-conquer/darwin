import { State } from '../../../darwin-types/State';
import { UserExecutionContext } from '../../../darwin-types/UserContext';
import recordIntents from './recordIntents';
import scheduleIntents from './scheduleIntents';
import { UserTickIntents } from './intent/Intent';
import handleFoodSpawning from './food-spawner';

/**
 * Executes all given user scripts and returns the next state object.
 *
 * @param state
 * @param scripts
 */
function performTick(state: State, scripts: UserExecutionContext[]): State {
  const userTicks = scripts.map(
    (executionContext): UserTickIntents => {
      try {
        const intents = recordIntents(executionContext.userScript, state);
        return {
          context: executionContext,
          intents,
        };
      } catch (e) {
        // assume no intents in case of script error
        return {
          context: executionContext,
          intents: [],
        };
      }
    }
  );

  const newState = scheduleIntents(state, userTicks);
  return handleFoodSpawning(newState);
}

export default performTick;
