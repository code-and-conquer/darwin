import scheduleIntents from './scheduleIntents';
import { State } from '../../../darwin-types/State';

describe('scheduleIntents', () => {
  const getDummyState = (): State => ({
    objectMap: {},
    objectIds: [],
  });
  it('returns state of a given intent', () => {
    const mockExecute = jest.fn();
    const state = getDummyState();
    mockExecute.mockReturnValueOnce(state);
    const newState = scheduleIntents(getDummyState(), [
      {
        context: {
          userScript: {
            script: '',
          },
          unitId: '',
        },
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
