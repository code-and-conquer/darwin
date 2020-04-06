import { UserTickIntents } from '../intent/Intent';
import produce from '../../helper/produce';
import { ExecutionTimeline, PER_TICK_ENERGY } from './types';
import { shuffleArray } from '../../helper/array';

export function mapToTimeline(userTicks: UserTickIntents[]): ExecutionTimeline {
  return userTicks.reduce(
    (timeline: ExecutionTimeline, { context, intents }) => {
      let accumulatedCost = 0;
      return intents.reduce((localTimeline, intent) => {
        return produce(localTimeline, draft => {
          accumulatedCost += intent.cost;
          if (draft.map[accumulatedCost] === undefined) {
            draft.map[accumulatedCost] = {
              cost: accumulatedCost,
              userIntents: [],
            };
            draft.accessors.push(accumulatedCost);
          }
          draft.map[accumulatedCost].userIntents.push({
            intent,
            context,
          });
        });
      }, timeline);
    },
    { map: {}, accessors: [] }
  );
}

export function shuffleTimelineIntentEntries(
  timeline: ExecutionTimeline
): ExecutionTimeline {
  return produce(timeline, (draft: ExecutionTimeline) => {
    draft.accessors
      .map(id => draft.map[id])
      .forEach(costEntry => {
        draft.map[costEntry.cost].userIntents = shuffleArray(
          costEntry.userIntents
        );
      });
  });
}

export function orderTimelineEntries(
  timeline: ExecutionTimeline
): ExecutionTimeline {
  return {
    map: timeline.map,
    accessors: [...timeline.accessors].sort(),
  };
}

export function filterUnreachableTimelineEntries(
  timeline: ExecutionTimeline
): ExecutionTimeline {
  return {
    map: timeline.map,
    accessors: [...timeline.accessors].filter(cost => cost <= PER_TICK_ENERGY),
  };
}

const HANDLERS = [
  shuffleTimelineIntentEntries,
  orderTimelineEntries,
  filterUnreachableTimelineEntries,
];

/**
 * Prepares execution timeline for all user ticks.
 * Merges all ticks to an executable timeline.
 * @param userTicks
 */
export default function getTimeline(
  userTicks: UserTickIntents[]
): ExecutionTimeline {
  return HANDLERS.reduce(
    (localTimeline, handler) => handler(localTimeline),
    mapToTimeline(userTicks)
  );
}
