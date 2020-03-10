import scheduleIntents from './scheduleIntents';
import { State } from '../../../darwin-types/State';

describe('scheduleIntents', () => {
  const getDummyState = (): State => ({
    objectMap: {},
    objectIds: [],
    tick: 0,
  });
  it('returns state of a given intent', () => {
    const mockExecute = jest.fn();
    const state = getDummyState();
    mockExecute.mockReturnValueOnce(state);
    const newState = scheduleIntents(getDummyState(), [
      {
        intents: [
          {
            execute: mockExecute,
          },
        ],
      },
    ]);

    expect(newState).toBe(state);
  });
});
