import { State } from '../../../darwin-types/State';
import { UserExecutionContext } from '../../../darwin-types/UserContext';
import recordIntents from './recordIntents';
import scheduleIntents from './scheduleIntents';
import { UserTickIntents } from './intent/Intent';
import handleFoodSpawning from './food-spawner';
import updateHealth from './health-mechanics/unitUtils';

const handleGameMechanics = (
  state: State,
  userTicks: UserTickIntents[]
): State => handleFoodSpawning(updateHealth(scheduleIntents(state, userTicks)));

/**
 * Executes all given user scripts and returns the next state object.
 *
 * @param state
 * @param contexts
 */
function performTick(state: State, contexts: UserExecutionContext[]): State {
  // This line removes the user context with no units
  const filteredContexts = contexts.filter(context =>
    state.objectIds.includes(context.unitId)
  );
  const userTicks = filteredContexts.map(
    (executionContext): UserTickIntents => {
      try {
        const intents = recordIntents(executionContext, state);
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
  return handleGameMechanics(state, userTicks);
}

export default performTick;
