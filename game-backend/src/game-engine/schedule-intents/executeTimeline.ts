import { State } from '@darwin/types';
import { ExecutionTimeline } from './types';

/**
 * execute a given ExecutionTimeline and propagate state
 * @param timeline
 * @param initialState
 */
export default function executeTimeline(
  timeline: ExecutionTimeline,
  initialState: State
): State {
  return timeline.accessors
    .map(cost => timeline.map[cost])
    .reduce(
      (userState, costEntry) =>
        costEntry.userIntents.reduce(
          (state, userIntentEntry) =>
            userIntentEntry.intent.execute(state, userIntentEntry.context),
          userState
        ),
      initialState
    );
}
