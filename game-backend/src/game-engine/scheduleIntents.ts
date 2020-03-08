import { UserTickIntents } from './intent/Intent';
import { State } from '../../../darwin-types/State';

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
        (state, intent) => intent.execute(state, null),
        userState
      ),
    initialState
  );
}

export default scheduleIntents;
