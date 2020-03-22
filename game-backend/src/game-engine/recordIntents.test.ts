import StateBuilder from '../test-helper/StateBuilder';
import recordIntents from './recordIntents';
import { State } from '../../../darwin-types/State';

let emptyState: State;

describe('recordIntents', () => {
  beforeEach(() => {
    emptyState = StateBuilder.buildState().build();
  });

  it('handles no script properly', () => {
    const intentions = recordIntents(
      {
        script: '',
      },
      emptyState
    );
    expect(intentions.length).toBe(0);
  });

  it('handles single script properly', () => {
    const intentions = recordIntents(
      {
        script: "move('UP')",
      },
      emptyState
    );
    expect(intentions.length).toBe(1);
  });

  it('handles double script properly', () => {
    const intentions = recordIntents(
      {
        script: "move('UP');move('DOWN');",
      },
      emptyState
    );
    expect(intentions.length).toBe(2);
  });

  it('handles es6 script properly', () => {
    const intentions = recordIntents(
      {
        script: "((...args) => {move(...args)})('UP')",
      },
      emptyState
    );
    expect(intentions.length).toBe(1);
  });

  it('stops endless scripts', () => {
    expect(() =>
      recordIntents(
        {
          script: 'while(true){}',
        },
        emptyState
      )
    ).toThrow();
  });
});
