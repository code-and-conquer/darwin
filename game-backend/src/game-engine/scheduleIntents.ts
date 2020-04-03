import { State } from '@darwin/types';
import { UserTickIntents } from './intent/Intent';

/**
 * Execute all Intents for a given tick.
 *
 * @param initialState
 * @param userTicks
 */
function scheduleIntents(
  initialState: State,
  userTicks: UserTickIntents[]
): State {
  return userTicks.reduce(
    (userState, userTickIntents) =>
      userTickIntents.intents.reduce(
        (state, intent) => intent.execute(state, userTickIntents.context),
        userState
      ),
    initialState
  );
}

export default scheduleIntents;
