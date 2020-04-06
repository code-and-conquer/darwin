import { UserContext } from '@darwin/types';
import {
  filterUnreachableTimelineEntries,
  mapToTimeline,
  orderTimelineEntries,
  shuffleArray,
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

describe('shuffleArray', () => {
  /**
   * Tests position of an element after array shuffle based on probability.
   * This test asserts that an element can be found with a high probability in all places.
   * If the test fails often consider increasing test samples or switching the algorithm.
   */
  it('shuffles fairly', () => {
    const array = ['test', '', '', '', ''];

    const testStringDistribution = [0, 0, 0, 0, 0];
    for (let i = 0; i < 1000; i++) {
      const newArray = shuffleArray(array);
      const index = newArray.indexOf('test');
      testStringDistribution[index]++;
    }
    const average =
      testStringDistribution.reduce(
        (total, occurence) => total + occurence,
        0
      ) / testStringDistribution.length;

    const expectDifference = (occurenceCount: number): void => {
      expect(Math.abs(average - occurenceCount)).toBeLessThan(50);
    };

    testStringDistribution.forEach(occurence => expectDifference(occurence));
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
