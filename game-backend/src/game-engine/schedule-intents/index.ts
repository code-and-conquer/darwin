import { State } from '@darwin/types';
import { UserTickIntents } from '../intent/Intent';
import getTimeline from './getTimeline';
import executeTimeline from './executeTimeline';

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
  const timeline = getTimeline(userTicks);
  return executeTimeline(timeline, initialState);
}

export default scheduleIntents;
