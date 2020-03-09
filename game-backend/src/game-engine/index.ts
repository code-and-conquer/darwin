import { State } from '../../../darwin-types/State';
import { UserExecutionContext } from '../../../darwin-types/UserContext';
import recordIntents from './recordIntents';
import scheduleIntents from './scheduleIntents';
import { UserTickIntents } from './intent/Intent';

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
        const intents = recordIntents(executionContext.userScript);
        return {
          intents,
        };
      } catch (e) {
        // assume no intents in case of script error
        return {
          intents: [],
        };
      }
    }
  );

  return scheduleIntents(state, userTicks);
}

export default performTick;
