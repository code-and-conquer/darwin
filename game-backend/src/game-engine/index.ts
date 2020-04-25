import {
  State,
  UserContextContainer,
  UserExecutionFeedbackContainer,
} from '@darwin/types';
import scheduleIntents from './schedule-intents';
import handleGameMechanics from './mechanics';
import extractExecutionFeedbackFromTicks from './core/extractExecutionFeedbackFromTicks';
import handleUserScript from './core/handleUserScript';
import { ElevatedUserExecutionContext } from './core/types';

/**
 * Executes all given user executionContexts and returns the next state object.
 *
 * @param state
 * @param userContextContainer
 */
function performTick(
  state: State,
  userContextContainer: UserContextContainer
): [State, UserExecutionFeedbackContainer] {
  const executionContexts = userContextContainer.userContextIds.map(
    (id): ElevatedUserExecutionContext => ({
      ...userContextContainer.userContextMap[id],
      userId: id,
    })
  );
  const userTicks = executionContexts.map(context =>
    handleUserScript(state, context)
  );

  const newState = scheduleIntents(state, userTicks);

  const newStores = extractExecutionFeedbackFromTicks(userTicks);

  return [handleGameMechanics(newState), newStores];
}

export default performTick;
