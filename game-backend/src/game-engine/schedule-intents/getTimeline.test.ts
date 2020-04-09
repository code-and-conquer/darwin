import { UserContext } from '@darwin/types';
import {
  filterUnreachableTimelineEntries,
  mapToTimeline,
  orderTimelineEntries,
} from './getTimeline';
import { Intent, UserTickIntents } from '../intent/Intent';
import { ExecutionTimeline } from './types';

const fakeIntent = ({ cost = 1, execute = jest.fn() } = {}): Intent => ({
  cost,
  execute,
});

const fakeContext = (): UserContext => ({ unitId: '' });

describe('mapToTimeline', () => {
  let lazyUser: UserTickIntents;
  let normalUser: UserTickIntents;

  beforeEach(() => {
    lazyUser = {
      context: fakeContext(),
      intents: [fakeIntent()],
    };
    normalUser = {
      context: fakeContext(),
      intents: [fakeIntent(), fakeIntent(), fakeIntent()],
    };
  });
  it('accumulates tick cost', () => {
    const userTicks: UserTickIntents[] = [lazyUser, normalUser];

    const timeline = mapToTimeline(userTicks);

    expect(timeline.accessors).toEqual([1, 2, 3]);
    expect(timeline.map[1].userIntents.length).toBe(2);
  });
});

describe('orderTimelineEntries', () => {
  it('orders mixed up timeline entries', () => {
    const timeline: ExecutionTimeline = {
      map: {},
      accessors: [3, 1, 4.5, 2, 1.2],
    };

    const orderedTimeline = orderTimelineEntries(timeline);

    expect(orderedTimeline.accessors).toEqual([1, 1.2, 2, 3, 4.5]);
  });
});

describe('filterUnreachableTimelineEntries', () => {
  it('filters excessive intents', () => {
    const timeline: ExecutionTimeline = {
      map: {},
      accessors: [1, 2, 3, 4, 5, 6, 99999],
    };

    const filteredTimeline = filterUnreachableTimelineEntries(timeline);

    expect(filteredTimeline.accessors.length).toBe(3);
  });
});
